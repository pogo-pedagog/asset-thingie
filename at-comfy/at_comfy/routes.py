"""Register ``/at/*`` aiohttp routes on Comfy's ``PromptServer``."""

from __future__ import annotations

import logging

logger = logging.getLogger(__name__)

_registered = False


def register_routes() -> None:
    global _registered
    if _registered:
        return
    try:
        from server import PromptServer
    except ImportError:
        logger.debug("at_comfy: server.PromptServer not available (skip route registration)")
        return

    from at_comfy.route_handlers import register_all, schedule_download_restore

    register_all(PromptServer.instance.routes)
    schedule_download_restore()
    _registered = True
    logger.info("at_comfy: registered /at/* routes")
    try:
        from at_comfy.scanner import schedule_scan_background

        schedule_scan_background()
    except Exception:
        logger.debug("at_comfy: startup scan not scheduled", exc_info=True)


def create_test_app():
    from aiohttp import web

    from at_comfy.route_handlers import mount_on_app

    app = web.Application()
    mount_on_app(app)
    return app
