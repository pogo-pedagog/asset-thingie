"""HTTP client for Civitai public API (normalized DTOs)."""

from __future__ import annotations

import asyncio
import json
import logging
import random
import re
from datetime import UTC, datetime
from typing import Any
from urllib.parse import parse_qsl, urlencode, urlparse, urlunparse

import httpx
from at_comfy.civitai.models import (
    CivitaiModel,
    CivitaiModelVersion,
    ModelListPage,
    SearchParams,
)
from pydantic import ValidationError

logger = logging.getLogger(__name__)

HTTP_TIMEOUT_DEFAULT = 60
HTTP_CONNECT_TIMEOUT = 30

# Transient Civitai / CDN failures (504 Gateway Timeout is common under load).
_CIVITAI_RETRYABLE_STATUSES = frozenset({408, 429, 502, 503, 504})
_CIVITAI_RETRY_MAX_ATTEMPTS = 4
_CIVITAI_RETRY_BASE_DELAY_S = 1.0
_CIVITAI_RETRY_MAX_DELAY_S = 32.0

CIVITAI_MODEL_PAGE = "https://civitai.com/models"

# Query keys on ``/api/v1/models`` that carry pagination only (Civitai ``nextPage`` /
# ``prevPage`` URLs often drop ``types``, ``baseModels``, etc.).
_MODELS_LIST_PAGINATION_KEYS = frozenset({"cursor", "page"})


def models_query_items_from_search_params(params: SearchParams) -> list[tuple[str, str]]:
    """Build ``GET /api/v1/models`` query pairs (same semantics as the first-page search).

    Content-type filters use Civitai's repeated ``types`` query keys (e.g. ``types=Checkpoint``);
    results are not narrowed by type in the client after fetch.
    """
    q: list[tuple[str, str]] = []
    q.append(("limit", str(params.limit)))
    q.append(("sort", params.sort))
    if params.period and params.period != "All Time":
        q.append(("period", params.period.replace(" ", "")))
    if params.content_types:
        for t in params.content_types:
            q.append(("types", t))
    if params.search_term.strip():
        st = params.search_term.replace("\\", "\\\\").lower()
        if "civitai.com" in st:
            m = re.search(r"models/(\d+)", st)
            if m:
                return [
                    ("ids", m.group(1)),
                    ("limit", str(params.limit)),
                    ("nsfw", "true" if params.nsfw else "false"),
                ]
        key_map = {"username": "username", "tag": "tag", "model_name": "query"}
        sk = key_map.get(params.search_type, "query")
        q.append((sk, st))
    if params.base_models:
        for bm in params.base_models:
            q.append(("baseModels", bm))
    if params.favorites_only:
        q.append(("favorites", "true"))
    q.append(("nsfw", "true" if params.nsfw else "false"))
    return q


def merge_models_list_pagination_url(next_or_prev_url: str, params: SearchParams) -> str:
    """
    Recombine filters from ``params`` with pagination markers from a Civitai ``nextPage``
    or ``prevPage`` URL. The API sometimes returns pagination links that omit filters,
    which would otherwise widen results on Load more / infinite scroll.
    """
    raw = (next_or_prev_url or "").strip()
    if not raw:
        return next_or_prev_url
    if not raw.startswith(("http://", "https://")):
        raw = f"https://civitai.com{raw if raw.startswith('/') else '/' + raw}"
    parsed = urlparse(raw)
    path_lower = (parsed.path or "").lower()
    if "/api/v1/models" not in path_lower:
        return next_or_prev_url
    next_items = parse_qsl(parsed.query, keep_blank_values=True)
    pag_pairs = [(k, v) for k, v in next_items if k in _MODELS_LIST_PAGINATION_KEYS]
    filter_pairs = models_query_items_from_search_params(params)
    merged_pairs = filter_pairs + pag_pairs
    scheme = parsed.scheme or "https"
    netloc = parsed.netloc or "civitai.com"
    new_query = urlencode(merged_pairs, doseq=True)
    return urlunparse((scheme, netloc, parsed.path, "", new_query, ""))

# ComfyUI / Civitai resource URN: urn:air:{ecosystem}:{kind}:civitai:{modelId}@{versionId}
_CIVITAI_AIR_URN_RE = re.compile(
    r"^urn:air:[^:]+:[^:]+:civitai:(?P<model_id>\d+)(?:@(?P<version_id>\d+))?\s*$",
    re.IGNORECASE,
)


def civitai_model_page_url(model_id: int) -> str:
    """Public Civitai model page URL (no trailing slash)."""
    return f"{CIVITAI_MODEL_PAGE}/{int(model_id)}"


def parse_civitai_model_id_from_url(url: str) -> int | None:
    """
    Extract Civitai model id from common URL shapes (V1.19).

    Accepts e.g. ``https://civitai.com/models/123``, ``.../models/123-slug``,
    ``...?modelVersionId=456``, paths without scheme, and ``www`` host.
    Returns ``None`` if no model id can be read.
    """
    raw = (url or "").strip()
    if not raw:
        return None
    if not raw.startswith(("http://", "https://")):
        raw = f"https://{raw}"
    try:
        parsed = urlparse(raw)
    except ValueError:
        return None
    host = (parsed.hostname or "").lower()
    if host != "civitai.com" and not host.endswith(".civitai.com"):
        return None
    path = (parsed.path or "").strip("/")
    segments = [s for s in path.split("/") if s]
    if len(segments) >= 2 and segments[0].lower() == "models":
        m = re.match(r"^(\d+)", segments[1])
        if m:
            return int(m.group(1))
    return None


def parse_civitai_urn(urn: str) -> tuple[int, int | None] | None:
    """
    Parse a Civitai ``urn:air:…:civitai:modelId`` (optional ``@versionId``) URN.

    Returns ``(model_id, version_id_or_none)`` for Civitai AIR URNs; ``None`` if
    the string is not a recognized Civitai URN (V1.21).
    """
    raw = (urn or "").strip()
    if not raw:
        return None
    m = _CIVITAI_AIR_URN_RE.match(raw)
    if not m:
        return None
    mid = int(m.group("model_id"))
    vg = m.group("version_id")
    vid: int | None = int(vg) if vg else None
    return (mid, vid)


def should_send_civitai_auth(url: str) -> bool:
    """True when ``url`` is on civitai.com (Bearer may be accepted)."""
    host = urlparse(url).hostname or ""
    return host == "civitai.com" or host.endswith(".civitai.com")


def civitai_image_display_url(url: str, *, natural_width: int | None = None) -> str:
    """Prefer native width in path-style ``/width=N`` segments (matches AssetThingie browse UI)."""
    u = (url or "").strip()
    if not u:
        return u
    if natural_width and re.search(r"/width=\d+", u):
        return re.sub(r"/width=\d+", f"/width={int(natural_width)}", u, count=1)
    return u


def civitai_image_url_with_width(url: str, width: int) -> str:
    """
    Set or replace a single ``width`` query param.

    Appending a second ``width=`` breaks Civitai ``image.civitai.com`` URLs that already
    include ``?width=200`` (malformed query / needless redirects).
    """
    u = (url or "").strip()
    if not u:
        return u
    if re.search(r"([\?&])width=\d+", u):
        return re.sub(r"([\?&])width=\d+", rf"\1width={int(width)}", u, count=1)
    sep = "&" if "?" in u else "?"
    return f"{u}{sep}width={int(width)}"


def civitai_image_strip_width_query(url: str) -> str:
    """Remove ``width=`` query keys so CDN can serve the largest embedded variant."""
    u = (url or "").strip()
    if not u:
        return u
    if "?" not in u and "&" not in u:
        return u
    from urllib.parse import parse_qsl, urlencode, urlparse, urlunparse

    parsed = urlparse(u)
    items = [(k, v) for k, v in parse_qsl(parsed.query, keep_blank_values=True) if k.lower() != "width"]
    q = urlencode(items, doseq=True)
    return urlunparse(parsed._replace(query=q))


def civitai_image_original_fetch_url(url: str, *, natural_width: int | None = None) -> str:
    """URL for fetching the Civitai-stored original upload (strips ``width`` query params).

    CDN paths sometimes include ``/width=N/``. Rewriting that to ``/width={natural_width}/``
    still often yields a **derivative** (e.g. transcoded JPEG). The ``/original=true/`` path
    segment requests the **true uploaded file** (PNG with tEXt/zTXt metadata when the user
    uploaded a PNG). Current API responses usually ship ``original=true`` already; this
    branch keeps legacy ``/width=N/`` links aligned with that behavior.

    When no path ``width=`` segment is present, falls back to :func:`civitai_image_display_url`
    (``natural_width`` is only consulted on that path — typical ``original=true`` URLs are unchanged
    aside from query stripping).
    """
    u = (url or "").strip()
    if not u:
        return u
    if re.search(r"/width=\d+", u):
        u = re.sub(r"/width=\d+", "/original=true", u, count=1)
    else:
        u = civitai_image_display_url(u, natural_width=natural_width)
    return civitai_image_strip_width_query(u)


def civitai_download_headers(
    *,
    api_key: str = "",
    user_agent: str = "AssetThingie-Comfy/0.1",
    model_id: int | None = None,
    for_url: str | None = None,
) -> dict[str, str]:
    """
    HTTP headers for image/download fetches.

    When ``for_url`` is set, Authorization is only added for civitai hosts
    (presigned CDN URLs often must not get Bearer). When ``for_url`` is omitted,
    Authorization is added whenever an API key is configured.
    """
    headers: dict[str, str] = {"User-Agent": user_agent}
    if api_key and (for_url is None or should_send_civitai_auth(for_url)):
        headers["Authorization"] = f"Bearer {api_key}"
    if model_id is not None:
        headers["Referer"] = civitai_model_page_url(model_id)
    return headers


# Raw response text logged at DEBUG when troubleshooting flaky API responses.
_MAX_DEBUG_BODY_CHARS = 12_288

_RESPONSE_HEADER_KEYS = frozenset({"content-type", "content-length", "retry-after", "cf-ray", "server"})


def _redact_headers(h: dict[str, str]) -> dict[str, str]:
    out = {k: v for k, v in h.items()}
    if "Authorization" in out:
        out["Authorization"] = "Bearer <redacted>"
    return out


def _interesting_response_headers(r: httpx.Response) -> dict[str, str]:
    return {k: v for k, v in r.headers.items() if k.lower() in _RESPONSE_HEADER_KEYS}


def _truncate_for_log(text: str, max_chars: int = _MAX_DEBUG_BODY_CHARS) -> tuple[str, bool]:
    if len(text) <= max_chars:
        return text, False
    return text[:max_chars], True


def _parse_model_items(items_raw: list[dict]) -> list[CivitaiModel]:
    out: list[CivitaiModel] = []
    for raw in items_raw:
        try:
            out.append(CivitaiModel.from_api(raw))
        except ValidationError as e:
            mid = raw.get("id")
            logger.warning("Skipping Civitai model %r: %s", mid, e)
    return out


class CivitaiAPIError(Exception):
    def __init__(self, message: str, status_code: int | None = None):
        super().__init__(message)
        self.status_code = status_code


def _retry_delay_after_response(attempt_index: int, response: httpx.Response | None) -> float:
    """Backoff delay before the next attempt (seconds)."""
    base = min(
        _CIVITAI_RETRY_BASE_DELAY_S * (2**attempt_index),
        _CIVITAI_RETRY_MAX_DELAY_S,
    )
    jitter = random.uniform(0, 0.35)
    if response is not None and response.status_code == 429:
        ra = (response.headers.get("Retry-After") or "").strip()
        if ra.isdigit():
            return max(float(ra), base + jitter)
    return base + jitter


def civitai_error_message_for_response(status_code: int, body_text: str) -> str:
    """Map HTTP error bodies to clearer UI copy (Civitai sometimes returns generic 500s)."""
    blob = body_text or ""
    if status_code in (502, 503, 504) and "<html" in blob.lower()[:800]:
        return (
            f"Civitai temporarily unavailable ({status_code}); the request often succeeds "
            "after a short wait — try again."
        )
    default = f"Civitai API error: {status_code} {blob[:200]}"
    raw = (body_text or "").strip()
    if not raw:
        return default
    try:
        err_obj = json.loads(raw)
    except json.JSONDecodeError:
        return default
    if not isinstance(err_obj, dict):
        return default
    err_token = str(err_obj.get("error") or "").strip().lower()
    if err_token == "user not found":
        return (
            "Exact user not found — Civitai's API doesn't support partial user searches; "
            "use the exact username from their profile or model URL."
        )
    return default


def parse_civitai_early_access_deadline(deadline: str | None) -> datetime | None:
    """Parse Civitai ``earlyAccessDeadline`` to aware UTC, or ``None`` if missing/unparseable."""
    if deadline is None:
        return None
    s = str(deadline).strip()
    if not s:
        return None
    if s.endswith("Z"):
        s = s[:-1] + "+00:00"
    try:
        dt = datetime.fromisoformat(s)
    except ValueError:
        logger.warning(
            "Unparseable Civitai earlyAccessDeadline %r (normalized %r); "
            "treating as absent and falling back to availability",
            deadline,
            s,
        )
        return None
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=UTC)
    else:
        dt = dt.astimezone(UTC)
    return dt


def civitai_version_is_active_early_access(version: dict, *, now: datetime) -> bool:
    """True when Civitai marks the version as in an early-access window.

    When ``earlyAccessDeadline`` is present and parseable, it is authoritative (past deadline ⇒ public).
    The comparison is half-open in UTC: ``now < deadline`` ⇒ still EA; at exactly ``deadline`` ⇒ public.
    Do not change to ``<=`` without revisiting ``test_early_access_deadline_instant_is_public``.

    Otherwise Civitai may still set ``availability`` to ``EarlyAccess`` with a null deadline
    (see e.g. public API model list payloads).
    """
    raw = version.get("earlyAccessDeadline")
    if isinstance(raw, str):
        dt = parse_civitai_early_access_deadline(raw)
        if dt is not None:
            return now < dt
    av = version.get("availability")
    if isinstance(av, str) and av.strip().lower() == "earlyaccess":
        return True
    return False


def _published_at_sort_key(version: dict) -> str:
    p = version.get("publishedAt")
    return p.strip() if isinstance(p, str) and p.strip() else ""


def _version_id_sort_key(version: dict) -> int:
    raw = version.get("id")
    if isinstance(raw, int) and not isinstance(raw, bool):
        return raw
    return -1


def _model_version_sort_key(version: dict) -> tuple[str, int]:
    """Descending sort: newest ``publishedAt``, then highest ``id`` for ties (deterministic)."""
    return (_published_at_sort_key(version), _version_id_sort_key(version))


def _raw_item_for_browse_detail(item: dict, *, now: datetime) -> dict | None:
    """All file-bearing versions sorted by ``publishedAt`` desc, each with ``isEarlyAccess`` set."""
    vers: list[dict] = []
    for v in item.get("modelVersions") or []:
        if not isinstance(v, dict):
            continue
        if not v.get("files"):
            continue
        ea = civitai_version_is_active_early_access(v, now=now)
        vers.append({**v, "isEarlyAccess": ea})
    if not vers:
        return None
    vers.sort(key=_model_version_sort_key, reverse=True)
    return {**item, "modelVersions": vers}


def _prepare_browse_list_items(items: list[dict], *, now: datetime) -> list[dict]:
    """Annotate and sort every list row like browse detail (full ``modelVersions``, ``isEarlyAccess``)."""
    out: list[dict] = []
    for item in items:
        if not isinstance(item, dict):
            continue
        ann = _raw_item_for_browse_detail(item, now=now)
        if ann:
            out.append(ann)
    return out


def _prepare_or_filter_models_page_items(
    items: list[dict],
    *,
    hide_early_access: bool,
    now: datetime,
) -> list[dict]:
    """Shape models list payloads.

    ``hide_early_access=False`` returns full rows (browse search / pagination;
    EA versions stay attached with ``isEarlyAccess``).

    ``hide_early_access=True`` drops active EA versions per item (used for
    ``get_model``, ``fetch_models_by_ids``, and tests — not for browse list).
    """
    if not hide_early_access:
        return _prepare_browse_list_items(items, now=now)
    out: list[dict] = []
    for item in items:
        if not isinstance(item, dict):
            continue
        one = _filter_early_access_single_item(item, hide=True, now=now)
        if one:
            out.append(one)
    return out


def _filter_early_access_single_item(item: dict, *, hide: bool, now: datetime) -> dict | None:
    if not hide:
        return item
    visible: list[dict] = []
    for v in item.get("modelVersions") or []:
        if not isinstance(v, dict):
            continue
        if not v.get("files"):
            continue
        if civitai_version_is_active_early_access(v, now=now):
            continue
        visible.append(v)
    if not visible:
        return None
    visible.sort(key=_model_version_sort_key, reverse=True)
    return {**item, "modelVersions": visible}


def _collect_excluded_early_access_variants(item: dict, now: datetime) -> list[dict[str, Any]]:
    rows: list[tuple[str, dict[str, Any]]] = []
    for v in item.get("modelVersions") or []:
        if not isinstance(v, dict):
            continue
        if not v.get("files"):
            continue
        if not civitai_version_is_active_early_access(v, now=now):
            continue
        dl = v.get("earlyAccessDeadline")
        name_raw = v.get("name")
        name = name_raw.strip() if isinstance(name_raw, str) else ""
        row: dict[str, Any] = {
            "id": v.get("id"),
            "name": name,
            "earlyAccessDeadline": dl if isinstance(dl, str) else None,
        }
        rows.append((_model_version_sort_key(v), row))
    rows.sort(key=lambda t: t[0], reverse=True)
    return [t[1] for t in rows]


def _filter_early_access(items: list[dict], hide: bool) -> list[dict]:
    if not hide:
        return items
    now = datetime.now(UTC)
    out: list[dict] = []
    for item in items:
        if not isinstance(item, dict):
            continue
        filtered = _filter_early_access_single_item(item, hide=True, now=now)
        if filtered:
            out.append(filtered)
    return out


class CivitaiClient:
    """Civitai REST client.

    Browse list calls (``search``, ``fetch_url``) always use full model rows so the UI
    can show every version with ``isEarlyAccess`` markers.

    ``hide_early_access`` only affects download-oriented fetches (``get_model``,
    ``fetch_models_by_ids``): when True, active early-access versions are removed
    before parsing (hash enrichment uses ``hide_early_access=False`` so by-hash
    versions still match ``get_model``). Batch download resolution uses the config flag.
    """

    BASE_MODELS = "https://civitai.com/api/v1/models"
    BASE_VERSION = "https://civitai.com/api/v1/model-versions"
    BASE_IMAGES = "https://civitai.com/api/v1/images"

    def __init__(
        self,
        *,
        api_key: str = "",
        user_agent: str = "AssetThingie-Comfy/0.1",
        hide_early_access: bool = True,
        client: httpx.AsyncClient | None = None,
    ):
        self._api_key = (api_key or "").strip()
        self._user_agent = user_agent
        # Used by get_model / fetch_models_by_ids only; browse list paths ignore this.
        self._hide_early_access = hide_early_access
        self._own_client = client is None
        self._client = client or httpx.AsyncClient(
            timeout=httpx.Timeout(float(HTTP_TIMEOUT_DEFAULT), connect=float(HTTP_CONNECT_TIMEOUT)),
            follow_redirects=False,
            headers=self._default_headers(),
        )

    def _default_headers(self) -> dict[str, str]:
        h = {
            "Connection": "keep-alive",
            "User-Agent": self._user_agent,
            "Accept": "application/json",
        }
        if self._api_key:
            h["Authorization"] = f"Bearer {self._api_key}"
        return h

    async def aclose(self) -> None:
        if self._own_client:
            await self._client.aclose()

    async def _request_json(self, method: str, url: str, **kwargs: Any) -> dict[str, Any]:
        headers = {**self._default_headers(), **kwargs.pop("headers", {})}
        extra = {k: v for k, v in kwargs.items() if k in ("params", "content", "json")}
        if _CIVITAI_RETRY_MAX_ATTEMPTS <= 0:
            raise CivitaiAPIError(
                "Civitai request could not be completed (retry limit must be positive).",
                status_code=None,
            )
        # Only entered when the limit is positive (see above). Each iteration ends in
        # ``return``, ``raise``, or ``continue``; there is no normal exit from the loop body
        # that skips all three (so the ``for`` does not fall through after the last iteration).
        for attempt in range(_CIVITAI_RETRY_MAX_ATTEMPTS):
            logger.debug(
                "Civitai request %s %s headers=%s kwargs=%s",
                method,
                url,
                _redact_headers(headers),
                extra or {},
            )
            try:
                r = await self._client.request(method, url, headers=headers, **kwargs)
            except httpx.RequestError as e:
                if attempt + 1 >= _CIVITAI_RETRY_MAX_ATTEMPTS:
                    raise CivitaiAPIError(
                        f"Civitai request failed after {_CIVITAI_RETRY_MAX_ATTEMPTS} attempts: {e}",
                        status_code=None,
                    ) from e
                delay = _retry_delay_after_response(attempt, None)
                logger.warning(
                    "Civitai %s %s transport error (attempt %s/%s): %s; retry in %.1fs",
                    method,
                    url,
                    attempt + 1,
                    _CIVITAI_RETRY_MAX_ATTEMPTS,
                    e,
                    delay,
                )
                await asyncio.sleep(delay)
                continue

            raw = r.text or ""
            preview, truncated = _truncate_for_log(raw)
            logger.debug(
                "Civitai response status=%s request_url=%s final_url=%s resp_headers=%s body_chars=%s body=%r%s",
                r.status_code,
                url,
                str(r.url),
                _interesting_response_headers(r),
                len(raw),
                preview,
                " [truncated]" if truncated else "",
            )
            if r.status_code >= 400:
                if (
                    r.status_code in _CIVITAI_RETRYABLE_STATUSES
                    and attempt + 1 < _CIVITAI_RETRY_MAX_ATTEMPTS
                ):
                    delay = _retry_delay_after_response(attempt, r)
                    logger.warning(
                        "Civitai %s %s returned %s (attempt %s/%s); retry in %.1fs",
                        method,
                        url,
                        r.status_code,
                        attempt + 1,
                        _CIVITAI_RETRY_MAX_ATTEMPTS,
                        delay,
                    )
                    await asyncio.sleep(delay)
                    continue
                raise CivitaiAPIError(
                    civitai_error_message_for_response(r.status_code, raw),
                    status_code=r.status_code,
                )
            try:
                return json.loads(raw) if raw.strip() else {}
            except json.JSONDecodeError as e:
                logger.debug("Civitai JSON decode error: %s", e)
                raise CivitaiAPIError(
                    f"Civitai API returned non-JSON ({r.status_code}): {raw[:200]!r}",
                    status_code=r.status_code,
                ) from e

    def build_search_url(self, params: SearchParams) -> str:
        q = models_query_items_from_search_params(params)
        return f"{self.BASE_MODELS}?{urlencode(q, doseq=True)}"

    async def search(self, params: SearchParams) -> ModelListPage:
        url = self.build_search_url(params)
        data = await self._request_json("GET", url)
        now = datetime.now(UTC)
        # Browse policy: always full rows; ignore self._hide_early_access (see class docstring).
        items_raw = _prepare_or_filter_models_page_items(
            data.get("items") or [],
            hide_early_access=False,
            now=now,
        )
        items = _parse_model_items(items_raw)
        return ModelListPage(items=items, metadata=data.get("metadata") or {})

    async def fetch_url(self, url: str) -> ModelListPage:
        data = await self._request_json("GET", url)
        now = datetime.now(UTC)
        # Browse policy: same as search() — full rows for grid / infinite scroll.
        items_raw = _prepare_or_filter_models_page_items(
            data.get("items") or [],
            hide_early_access=False,
            now=now,
        )
        items = _parse_model_items(items_raw)
        return ModelListPage(items=items, metadata=data.get("metadata") or {})

    async def _fetch_model_raw_by_id(self, model_id: int, *, nsfw: bool) -> dict[str, Any]:
        nsfw_q = "true" if nsfw else "false"
        url = f"{self.BASE_MODELS}?ids={int(model_id)}&nsfw={nsfw_q}"
        data = await self._request_json("GET", url)
        items = data.get("items") or []
        if not items:
            raise CivitaiAPIError(f"Model {model_id} not found", status_code=404)
        raw = items[0]
        if not isinstance(raw, dict):
            raise CivitaiAPIError(f"Model {model_id} not found", status_code=404)
        return raw

    async def get_model_detail_payload(self, model_id: int, *, nsfw: bool = False) -> CivitaiModel:
        """Browse detail: all file-bearing versions with ``isEarlyAccess`` on each (list endpoint)."""
        raw = await self._fetch_model_raw_by_id(model_id, nsfw=nsfw)
        now = datetime.now(UTC)
        detail_raw = _raw_item_for_browse_detail(raw, now=now)
        if not detail_raw or not detail_raw.get("modelVersions"):
            raise CivitaiAPIError("Model has no downloadable versions", status_code=404)
        try:
            return CivitaiModel.from_api(detail_raw)
        except ValidationError as e:
            raise CivitaiAPIError(
                f"Invalid model data from API: {e}",
                status_code=502,
            ) from e

    async def get_model(self, model_id: int, *, nsfw: bool = False) -> CivitaiModel:
        """Downloads / enqueue: non-early-access versions only when ``hide_early_access`` is on."""
        raw = await self._fetch_model_raw_by_id(model_id, nsfw=nsfw)
        now = datetime.now(UTC)
        filtered = _filter_early_access_single_item(raw, hide=self._hide_early_access, now=now)
        if not filtered or not filtered.get("modelVersions"):
            raise CivitaiAPIError("Model has no downloadable versions", status_code=404)
        try:
            return CivitaiModel.from_api(filtered)
        except ValidationError as e:
            raise CivitaiAPIError(
                f"Invalid model data from API: {e}",
                status_code=502,
            ) from e

    async def get_model_version(self, version_id: int, *, nsfw: bool = False) -> dict[str, Any]:
        nsfw_q = "true" if nsfw else "false"
        url = f"{self.BASE_VERSION}/{int(version_id)}?nsfw={nsfw_q}"
        return await self._request_json("GET", url)

    async def get_version_detail(self, version_id: int, *, nsfw: bool = False) -> CivitaiModelVersion:
        """Full model version (rich ``images[].meta``); list endpoint often omits meta."""
        raw = await self.get_model_version(version_id, nsfw=nsfw)
        try:
            return CivitaiModelVersion.from_api(raw)
        except ValidationError as e:
            raise CivitaiAPIError(
                f"Invalid model-version data from API: {e}",
                status_code=502,
            ) from e

    async def get_image_by_id(self, image_id: int, *, nsfw: bool = False) -> dict[str, Any] | None:
        """One row from ``GET /api/v1/images?imageId=…`` (full ``meta``, including nested images-API shape).

        See `<https://github.com/civitai/civitai/wiki/REST-API-Reference#%EF%B8%8F-get-apiv1images>`_.
        """
        q: list[tuple[str, str]] = [("limit", "1"), ("imageId", str(int(image_id)))]
        if nsfw:
            q.append(("nsfw", "true"))
        url = f"{self.BASE_IMAGES}?{urlencode(q)}"
        try:
            data = await self._request_json("GET", url)
        except CivitaiAPIError as e:
            logger.debug("Civitai image %s fetch failed: %s", image_id, e)
            return None
        items = data.get("items") or []
        row = items[0] if items and isinstance(items[0], dict) else None
        return row if isinstance(row, dict) else None

    async def model_version_by_hash(self, sha256: str) -> dict[str, Any] | None:
        """Resolve a version by SHA256. Civitai does not expose an ``nsfw`` query on this route;
        follow with ``get_model(..., nsfw=…)`` (as enrichment does) to apply content policy."""
        url = f"{self.BASE_VERSION}/by-hash/{sha256}"
        try:
            return await self._request_json("GET", url)
        except CivitaiAPIError as e:
            if e.status_code == 404:
                return None
            raise

    async def fetch_models_by_ids(self, ids: list[int], *, nsfw: bool = False) -> list[CivitaiModel]:
        """Fetch many models by id (batched). Preserves API item order where possible.

        Pass ``nsfw=True`` only when policy allows NSFW content; default is SFW-aligned
        (matches ``hide_nsfw`` default on clean installs).
        """
        from urllib.parse import urlencode

        if not ids:
            return []
        out: list[CivitaiModel] = []
        seen: set[int] = set()
        for i in range(0, len(ids), 100):
            chunk = ids[i : i + 100]
            q: list[tuple[str, str]] = [
                ("limit", "100"),
                ("nsfw", "true" if nsfw else "false"),
            ]
            for mid in chunk:
                q.append(("ids", str(mid)))
            url = f"{self.BASE_MODELS}?{urlencode(q, doseq=True)}"
            data = await self._request_json("GET", url)
            now_batch = datetime.now(UTC)
            items_raw = _prepare_or_filter_models_page_items(
                data.get("items") or [],
                hide_early_access=self._hide_early_access,
                now=now_batch,
            )
            for raw in items_raw:
                try:
                    m = CivitaiModel.from_api(raw)
                except ValidationError as e:
                    logger.warning("Skipping Civitai model %r: %s", raw.get("id"), e)
                    continue
                if m.id not in seen:
                    seen.add(m.id)
                    out.append(m)
            next_url = (data.get("metadata") or {}).get("nextPage")
            while next_url:
                data = await self._request_json("GET", next_url)
                now_page = datetime.now(UTC)
                for raw in _prepare_or_filter_models_page_items(
                    data.get("items") or [],
                    hide_early_access=self._hide_early_access,
                    now=now_page,
                ):
                    try:
                        m = CivitaiModel.from_api(raw)
                    except ValidationError as e:
                        logger.warning("Skipping Civitai model %r: %s", raw.get("id"), e)
                        continue
                    if m.id not in seen:
                        seen.add(m.id)
                        out.append(m)
                next_url = (data.get("metadata") or {}).get("nextPage")
        return out

    async def resolve_download_url(self, civitai_file_url: str, model_id: int) -> tuple[str | None, str | None]:
        """
        Follow Civitai download redirect. Returns (final_url, error_token).
        error_token is 'NO_API' if personal API key required.
        """
        headers = self._default_headers()
        headers["Referer"] = civitai_model_page_url(model_id)
        logger.debug(
            "Civitai download GET url=%s headers=%s",
            civitai_file_url,
            _redact_headers(headers),
        )
        r = await self._client.get(civitai_file_url, headers=headers)
        dbody, dtrunc = _truncate_for_log(r.text or "", max_chars=4096)
        logger.debug(
            "Civitai download response status=%s final_url=%s location=%r resp_headers=%s body_chars=%s body=%r%s",
            r.status_code,
            str(r.url),
            r.headers.get("Location"),
            _interesting_response_headers(r),
            len(r.text or ""),
            dbody,
            " [truncated]" if dtrunc else "",
        )
        if 300 <= r.status_code <= 308:
            loc = r.headers.get("Location")
            text = r.text or ""
            if "login?returnUrl" in text and "reason=download-auth" in text:
                return None, "NO_API"
            if loc:
                return loc, None
        if r.status_code == 200:
            return str(r.url), None
        return None, None
