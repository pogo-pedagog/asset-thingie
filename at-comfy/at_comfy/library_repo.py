"""SQLite queries for library list/detail/filters/subfolders."""

from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Any

from at_comfy.comfy_paths import install_root_for_family
from at_comfy.config import ATComfyConfig
from at_comfy.db import get_conn
from at_comfy.type_families import LORA_FAMILY


def _like(s: str) -> str:
    esc = s.replace("%", r"\%").replace("_", r"\_")
    return f"%{esc}%"


def _path_prefix_clause(pref_norm: str) -> tuple[str, list[Any]]:
    """Match files whose path equals ``pref_norm`` or lives under ``pref_norm/``."""
    esc = pref_norm.replace("%", r"\%").replace("_", r"\_")
    like_pattern = esc + "/%"
    return (
        " AND (REPLACE(lf.path, '\\', '/') = ? OR REPLACE(lf.path, '\\', '/') LIKE ? ESCAPE '\\')",
        [pref_norm, like_pattern],
    )


def _parse_search_terms(q: str) -> list[tuple[str | None, str]]:
    terms: list[tuple[str | None, str]] = []
    for part in q.split(","):
        raw = part.strip()
        if not raw:
            continue
        low = raw.lower()
        scope: str | None = None
        rest = raw
        if low.startswith("name:"):
            scope = "name"
            rest = raw.split(":", 1)[1].strip()
        elif low.startswith("trigger:"):
            scope = "trigger"
            rest = raw.split(":", 1)[1].strip()
        elif low.startswith("category:"):
            scope = "category"
            rest = raw.split(":", 1)[1].strip()
        elif low.startswith("tag:"):
            scope = "tag"
            rest = raw.split(":", 1)[1].strip()
        if not rest:
            continue
        terms.append((scope, rest))
    return terms


def _search_clause_for_term(scope: str | None, text: str) -> tuple[str, list[Any]]:
    like = _like(text)
    if scope == "name":
        return (
            """ AND (
                la.display_name LIKE ? ESCAPE '\\' OR lf.filename LIKE ? ESCAPE '\\'
                OR IFNULL(sm.title,'') LIKE ? ESCAPE '\\'
            )""",
            [like, like, like],
        )
    if scope == "trigger":
        return (
            """ AND (
                IFNULL(la.trigger_words,'') LIKE ? ESCAPE '\\'
                OR EXISTS (
                    SELECT 1 FROM trigger_words tw
                    WHERE tw.asset_id = la.asset_id AND tw.word LIKE ? ESCAPE '\\'
                )
            )""",
            [like, like],
        )
    if scope == "category":
        return (" AND IFNULL(la.category,'') LIKE ? ESCAPE '\\'", [like])
    if scope == "tag":
        return (
            """ AND EXISTS (
                SELECT 1 FROM asset_tags at_s
                INNER JOIN tags t_s ON t_s.tag_id = at_s.tag_id
                WHERE at_s.asset_id = la.asset_id AND t_s.name LIKE ? ESCAPE '\\'
            )""",
            [like],
        )
    return (
        """ AND (
            la.display_name LIKE ? ESCAPE '\\' OR lf.filename LIKE ? ESCAPE '\\'
            OR IFNULL(la.trigger_words,'') LIKE ? ESCAPE '\\'
            OR EXISTS (
                SELECT 1 FROM trigger_words tw
                WHERE tw.asset_id = la.asset_id AND tw.word LIKE ? ESCAPE '\\'
            )
            OR IFNULL(sm.title,'') LIKE ? ESCAPE '\\'
            OR IFNULL(sm.creator_name,'') LIKE ? ESCAPE '\\'
            OR EXISTS (
                SELECT 1 FROM asset_tags atf
                INNER JOIN tags tg ON tg.tag_id = atf.tag_id
                WHERE atf.asset_id = la.asset_id AND tg.name LIKE ? ESCAPE '\\'
            )
        )""",
        [like, like, like, like, like, like, like],
    )


def _append_search_filters(q: str, where: list[str], args: list[Any]) -> None:
    qt = (q or "").strip()
    if not qt:
        return
    for scope, text in _parse_search_terms(qt):
        frag, a = _search_clause_for_term(scope, text)
        where.append(frag)
        args.extend(a)


def tag_ids_for_names(conn: sqlite3.Connection, names: list[str]) -> list[int] | None:
    if not names:
        return None
    ids: list[int] = []
    for n in names:
        row = conn.execute("SELECT tag_id FROM tags WHERE name = ? COLLATE NOCASE", (n.strip(),)).fetchone()
        if row is None:
            return []
        ids.append(int(row["tag_id"]))
    return ids


def _family_sql_params(
    content_type: str,
    family: str,
) -> tuple[str, list[Any]]:
    ct = (content_type or "").strip()
    if ct:
        return " AND lf.content_type = ?", [ct]
    fam = (family or "").strip().lower()
    if fam == "lora":
        keys = sorted(LORA_FAMILY.content_type_keys)
        ph = ", ".join("?" * len(keys))
        return (
            f""" AND (
                LOWER(IFNULL(la.family,'')) = 'lora'
                OR LOWER(TRIM(IFNULL(lf.content_type, ''))) IN ({ph})
            )""",
            list(keys),
        )
    if fam == "checkpoint":
        return (
            """ AND (
                LOWER(IFNULL(la.family,'')) = 'checkpoint'
                OR LOWER(TRIM(IFNULL(lf.content_type, ''))) = 'checkpoint'
            )""",
            [],
        )
    return "", []


def _base_query(extra_where: str = "") -> str:
    return f"""
        SELECT
            la.asset_id,
            la.primary_path,
            la.display_name,
            lf.filename,
            lf.stem,
            lf.content_type,
            la.base_model,
            la.category,
            la.notes,
            la.trigger_words,
            la.default_strength,
            la.is_favorite,
            la.usage_count,
            la.last_used_at,
            lf.mtime,
            lf.sha256,
            sm.source_url,
            sm.creator_name,
            sm.title,
            (SELECT GROUP_CONCAT(t.name, ' · ')
             FROM asset_tags at
             INNER JOIN tags t ON t.tag_id = at.tag_id
             WHERE at.asset_id = la.asset_id
            ) AS asset_tag_names,
            (SELECT em.example_media_id FROM example_media em
             WHERE em.asset_id = la.asset_id
             ORDER BY em.sort_order ASC, em.example_media_id ASC LIMIT 1) AS cover_example_id
        FROM library_assets la
        INNER JOIN library_files lf ON lf.path = la.primary_path
        LEFT JOIN source_metadata sm ON sm.asset_id = la.asset_id
        WHERE 1=1
        {extra_where}
    """


def count_assets(
    *,
    q: str = "",
    content_type: str = "",
    base_model: str = "",
    category: str = "",
    path_prefix: str = "",
    family: str = "",
    tag_names: list[str] | None = None,
    sort: str = "",
) -> int:
    del sort  # unused for count
    conn = get_conn()
    fam_sql, fam_args = _family_sql_params(content_type, family)
    where: list[str] = [fam_sql]
    args: list[Any] = list(fam_args)

    if (base_model or "").strip():
        where.append(" AND la.base_model = ?")
        args.append(str(base_model).strip())
    if (category or "").strip():
        where.append(" AND la.category = ?")
        args.append(str(category).strip())
    if (path_prefix or "").strip():
        pref = str(path_prefix).strip().replace("\\", "/").rstrip("/")
        pfrag, pargs = _path_prefix_clause(pref)
        where.append(pfrag)
        args.extend(pargs)

    tag_ids = tag_ids_for_names(conn, tag_names or [])
    if tag_ids is not None:
        if not tag_ids:
            return 0
        for tid in tag_ids:
            where.append(
                " AND EXISTS (SELECT 1 FROM asset_tags atx WHERE atx.asset_id = la.asset_id AND atx.tag_id = ?)",
            )
            args.append(tid)

    _append_search_filters(q, where, args)

    sql = "SELECT COUNT(*) AS n FROM (" + _base_query("".join(where)) + ")"
    row = conn.execute(sql, tuple(args)).fetchone()
    return int(row["n"]) if row else 0


def list_assets(
    *,
    q: str = "",
    content_type: str = "",
    base_model: str = "",
    category: str = "",
    path_prefix: str = "",
    family: str = "",
    tag_names: list[str] | None = None,
    sort: str = "path",
    limit: int = 50,
    offset: int = 0,
) -> list[sqlite3.Row]:
    conn = get_conn()
    fam_sql, fam_args = _family_sql_params(content_type, family)
    where: list[str] = [fam_sql]
    args: list[Any] = list(fam_args)

    if (base_model or "").strip():
        where.append(" AND la.base_model = ?")
        args.append(str(base_model).strip())
    if (category or "").strip():
        where.append(" AND la.category = ?")
        args.append(str(category).strip())
    if (path_prefix or "").strip():
        pref = str(path_prefix).strip().replace("\\", "/").rstrip("/")
        pfrag, pargs = _path_prefix_clause(pref)
        where.append(pfrag)
        args.extend(pargs)

    tag_ids = tag_ids_for_names(conn, tag_names or [])
    if tag_ids is not None:
        if not tag_ids:
            return []
        for tid in tag_ids:
            where.append(
                " AND EXISTS (SELECT 1 FROM asset_tags atx WHERE atx.asset_id = la.asset_id AND atx.tag_id = ?)",
            )
            args.append(tid)

    _append_search_filters(q, where, args)

    s = (sort or "path").strip().lower().replace("-", "_")
    if s in ("most_used",):
        order = "la.usage_count DESC, lf.path ASC"
    elif s in ("recently_used",):
        order = "CASE WHEN la.last_used_at IS NULL THEN 1 ELSE 0 END, la.last_used_at DESC, lf.path ASC"
    else:
        order = "lf.path ASC"

    lim = max(1, min(int(limit), 200))
    off = max(0, int(offset))
    sql = _base_query("".join(where)) + f" ORDER BY {order} LIMIT ? OFFSET ?"
    args.extend([lim, off])
    return list(conn.execute(sql, tuple(args)).fetchall())


def get_asset_row(asset_id: int) -> sqlite3.Row | None:
    conn = get_conn()
    sql = _base_query(" AND la.asset_id = ?")
    return conn.execute(sql, (asset_id,)).fetchone()


def distinct_content_types() -> list[str]:
    conn = get_conn()
    rows = conn.execute(
        """
        SELECT DISTINCT lf.content_type FROM library_files lf
        WHERE lf.content_type IS NOT NULL AND TRIM(lf.content_type) != ''
        ORDER BY lf.content_type
        """,
    ).fetchall()
    return [str(r[0]) for r in rows if r[0]]


def distinct_base_models(*, content_type: str = "", family: str = "") -> list[str]:
    conn = get_conn()
    fam_sql, fam_args = _family_sql_params(content_type, family)
    sql = f"""
        SELECT DISTINCT la.base_model FROM library_assets la
        INNER JOIN library_files lf ON lf.path = la.primary_path
        WHERE la.base_model IS NOT NULL AND TRIM(la.base_model) != ''
        {fam_sql}
        ORDER BY la.base_model
    """
    rows = conn.execute(sql, tuple(fam_args)).fetchall()
    return [str(r[0]) for r in rows if r[0]]


def distinct_categories(*, content_type: str = "", family: str = "") -> list[str]:
    conn = get_conn()
    fam_sql, fam_args = _family_sql_params(content_type, family)
    sql = f"""
        SELECT DISTINCT la.category FROM library_assets la
        INNER JOIN library_files lf ON lf.path = la.primary_path
        WHERE la.category IS NOT NULL AND TRIM(la.category) != ''
        {fam_sql}
        ORDER BY la.category
    """
    rows = conn.execute(sql, tuple(fam_args)).fetchall()
    return [str(r[0]) for r in rows if r[0]]


def list_tags_with_counts(
    *,
    content_type: str = "",
    family: str = "",
    limit: int = 2000,
    and_tag_ids: list[int] | None = None,
) -> list[sqlite3.Row]:
    conn = get_conn()
    fam_sql, fam_args = _family_sql_params(content_type, family)
    extra = ""
    args: list[Any] = list(fam_args)
    if and_tag_ids:
        for tid in and_tag_ids:
            extra += """ AND EXISTS (
                SELECT 1 FROM asset_tags atf
                WHERE atf.asset_id = la.asset_id AND atf.tag_id = ?
            )"""
            args.append(tid)
    sql = f"""
        SELECT t.tag_id, t.name, COUNT(DISTINCT la.asset_id) AS count
        FROM tags t
        INNER JOIN asset_tags at ON at.tag_id = t.tag_id
        INNER JOIN library_assets la ON la.asset_id = at.asset_id
        INNER JOIN library_files lf ON lf.path = la.primary_path
        WHERE 1=1 {fam_sql} {extra}
        GROUP BY t.tag_id, t.name
        ORDER BY count DESC, t.name ASC
        LIMIT ?
    """
    args.append(int(limit))
    return list(conn.execute(sql, tuple(args)).fetchall())


def list_subfolders(parent: str, family: str, config: ATComfyConfig) -> tuple[list[str], str]:
    fam = (family or "").strip().lower()
    root_key = "checkpoint" if fam == "checkpoint" else "lora"
    root = install_root_for_family(root_key, config)
    if root is None:
        return [], ""
    base = Path(parent.strip()).resolve() if parent.strip() else root
    try:
        base = base.resolve()
    except OSError:
        base = root
    conn = get_conn()
    paths = [r[0] for r in conn.execute("SELECT path FROM library_files").fetchall()]
    names: set[str] = set()
    for ps in paths:
        try:
            pp = Path(ps).resolve()
            rel = pp.relative_to(base)
        except ValueError:
            continue
        parts = rel.parts
        if len(parts) >= 2:
            names.add(parts[0])
    return sorted(names), str(base)


def list_example_media(asset_id: int) -> list[sqlite3.Row]:
    conn = get_conn()
    return list(
        conn.execute(
            """
            SELECT example_media_id, asset_id, media_type, origin_type, local_path, source_url,
                   width, height, caption, metadata_json, sort_order, thumbnail_local_path
            FROM example_media
            WHERE asset_id = ?
            ORDER BY sort_order ASC, example_media_id ASC
            """,
            (asset_id,),
        ).fetchall(),
    )


def get_system_field_values(asset_id: int) -> dict[str, Any]:
    conn = get_conn()
    rows = conn.execute(
        "SELECT field_key, value_json FROM system_field_values WHERE asset_id = ?",
        (asset_id,),
    ).fetchall()
    out: dict[str, Any] = {}
    for r in rows:
        key = str(r["field_key"])
        raw = r["value_json"]
        if raw is None or raw == "":
            continue
        try:
            out[key] = json.loads(raw)
        except json.JSONDecodeError:
            out[key] = raw
    return out


def parse_trigger_words_json(raw: str | None) -> list[str]:
    if not raw:
        return []
    try:
        v = json.loads(raw)
        if isinstance(v, list):
            return [str(x) for x in v if str(x).strip()]
    except json.JSONDecodeError:
        pass
    return []
