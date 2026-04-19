"""Download worker pool."""

from __future__ import annotations

import asyncio

import pytest
from at_comfy.config import ATComfyConfig
from at_comfy.downloader import Downloader


@pytest.mark.asyncio
async def test_start_spawns_worker_pool(tmp_comfy_base) -> None:
    dlr = Downloader()
    cfg = ATComfyConfig(max_parallel_downloads=3)
    dlr.start(cfg)
    assert len(dlr._workers) == 3
    for w in dlr._workers:
        w.cancel()
    await asyncio.gather(*dlr._workers, return_exceptions=True)
    dlr._workers = []


@pytest.mark.asyncio
async def test_start_idempotent_same_parallelism(tmp_comfy_base) -> None:
    dlr = Downloader()
    cfg = ATComfyConfig(max_parallel_downloads=2)
    dlr.start(cfg)
    w1 = dlr._workers
    dlr.start(cfg)
    assert dlr._workers is w1
    for w in dlr._workers:
        w.cancel()
    await asyncio.gather(*dlr._workers, return_exceptions=True)
    dlr._workers = []
