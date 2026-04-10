#!/usr/bin/env python3
"""
Manual check: sample several Civitai gallery images and compare REST ``meta`` with
bytes embedded in the file (PNG tEXt / zTXt / iTXt, JPEG EXIF UserComment).

Run from the ``at-comfy`` package root (directory containing ``at_comfy/``)::

    python scripts/manual_civitai_image_metadata_sample.py

Environment:
    CIVITAI_API_KEY — optional Bearer token (same as the app).

Fetch URLs:
    Uses :func:`~at_comfy.civitai.client.civitai_image_original_fetch_url`, which rewrites
    legacy path segments ``/width=N/`` to ``/original=true/`` (not ``/width=natural/``) so
    the CDN returns the real upload (PNG text chunks) when available. Stripping the query
    alone on ``/width=450/`` URLs keeps a small derivative JPEG.
"""
from __future__ import annotations

import asyncio
import json
import os
import sys
from pathlib import Path

# Allow ``python scripts/foo.py`` without install
_ROOT = Path(__file__).resolve().parents[1]
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

import httpx  # noqa: E402
from at_comfy.civitai.client import civitai_image_original_fetch_url  # noqa: E402
from at_comfy.civitai.models import normalize_civitai_image_meta_dict  # noqa: E402
from at_comfy.image_generation_meta import (  # noqa: E402
    summarize_embedded_extraction,
    text_looks_like_generation_metadata,
)

LIST_URL = "https://civitai.com/api/v1/images"
SAMPLE_N = 10
TIMEOUT = httpx.Timeout(90.0, connect=30.0)


def _headers() -> dict[str, str]:
    h = {
        "Accept": "application/json",
        "User-Agent": "AssetThingie-Comfy/0.1-manual-metadata-check",
    }
    key = (os.environ.get("CIVITAI_API_KEY") or "").strip()
    if key:
        h["Authorization"] = f"Bearer {key}"
    return h


def _api_meta_useful(flat: dict | None) -> bool:
    if not flat:
        return False
    if flat.get("prompt") or flat.get("Prompt"):
        return True
    if any(k in flat for k in ("steps", "cfgScale", "negativePrompt", "sampler", "seed", "Size")):
        return True
    try:
        blob = json.dumps(flat, default=str)
    except Exception:
        blob = str(flat)
    return text_looks_like_generation_metadata(blob)


async def _list_images(client: httpx.AsyncClient, *, limit: int) -> list[dict]:
    # ``sort`` keeps the sample from being only the absolute newest edge cases.
    params: dict[str, str] = {
        "limit": str(limit),
        "nsfw": "false",
        "sort": "Most Reactions",
        "period": "AllTime",
    }
    r = await client.get(LIST_URL, params=params)
    r.raise_for_status()
    data = r.json()
    items = data.get("items") or []
    return [x for x in items if isinstance(x, dict)]


async def _run() -> None:
    want = max(SAMPLE_N + 5, 12)
    async with httpx.AsyncClient(timeout=TIMEOUT, headers=_headers(), follow_redirects=True) as ac:
        items = await _list_images(ac, limit=want)
        rows: list[dict] = []
        for it in items:
            if len(rows) >= SAMPLE_N:
                break
            url = (it.get("url") or "").strip()
            if not url:
                continue
            iid = it.get("id")
            try:
                w = int(it["width"]) if it.get("width") is not None else None
            except (TypeError, ValueError):
                w = None
            try:
                h = int(it["height"]) if it.get("height") is not None else None
            except (TypeError, ValueError):
                h = None
            meta_raw = it.get("meta")
            flat = normalize_civitai_image_meta_dict(meta_raw) if isinstance(meta_raw, dict) else None
            api_ok = _api_meta_useful(flat)
            fetch = civitai_image_original_fetch_url(url, natural_width=w)
            ir = await ac.get(fetch)
            ir.raise_for_status()
            body = ir.content
            emb = summarize_embedded_extraction(body)
            rows.append(
                {
                    "id": iid,
                    "size": f"{w}x{h}" if w and h else "",
                    "ct": (ir.headers.get("content-type") or "").split(";")[0].strip(),
                    "bytes": len(body),
                    "api_meta_ok": api_ok,
                    "embedded_ok": emb["embedded_useful"],
                    "embedded_src": emb["embedded_source"],
                    "png_keys": emb["png_text_keys"],
                    "fetch_url_host": httpx.URL(fetch).host or "",
                }
            )

    # Compact console report
    ok_both = sum(1 for r in rows if r["api_meta_ok"] and r["embedded_ok"])
    ok_either = sum(1 for r in rows if r["api_meta_ok"] or r["embedded_ok"])
    print(f"Sampled {len(rows)} images (target {SAMPLE_N}).")
    print(f"Useful API meta: {sum(1 for r in rows if r['api_meta_ok'])}/{len(rows)}")
    print(f"Useful embedded: {sum(1 for r in rows if r['embedded_ok'])}/{len(rows)}")
    print(f"Either source: {ok_either}/{len(rows)}  |  both: {ok_both}/{len(rows)}")
    print()
    for r in rows:
        pk = ",".join(r["png_keys"][:5]) + ("…" if len(r["png_keys"]) > 5 else "")
        print(
            f"id={r['id']}  api={r['api_meta_ok']}  embed={r['embedded_ok']} "
            f"src={r['embedded_src']}  {r['ct']} {r['bytes']//1024}KiB  keys={pk or '-'}"
        )


def main() -> None:
    asyncio.run(_run())


if __name__ == "__main__":
    main()
