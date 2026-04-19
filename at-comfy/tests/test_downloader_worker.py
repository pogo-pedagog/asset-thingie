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


@pytest.mark.asyncio
async def test_start_increases_workers_without_replacing_existing(tmp_comfy_base) -> None:
    """Raising max_parallel_downloads must append workers, not cancel active loops."""
    dlr = Downloader()
    dlr.start(ATComfyConfig(max_parallel_downloads=2))
    first = list(dlr._workers)
    assert len(first) == 2
    dlr.start(ATComfyConfig(max_parallel_downloads=4))
    assert len(dlr._workers) == 4
    assert dlr._workers[:2] == first
    for w in dlr._workers:
        w.cancel()
    await asyncio.gather(*dlr._workers, return_exceptions=True)
    dlr._workers = []
