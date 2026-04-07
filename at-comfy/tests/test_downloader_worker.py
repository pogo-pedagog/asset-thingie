"""Downloader worker helpers."""

from __future__ import annotations

import pytest
from at_comfy.config import ATComfyConfig


@pytest.mark.asyncio
async def test_semaphore_recreated_when_parallelism_changes() -> None:
    import at_comfy.downloader as dl

    dl._sem = None
    dl._sem_capacity = None
    c2 = ATComfyConfig(max_parallel_downloads=2)
    c4 = ATComfyConfig(max_parallel_downloads=4)
    s2 = dl._sem_for(c2)
    s4 = dl._sem_for(c4)
    assert s2 is not s4
    dl._sem = None
    dl._sem_capacity = None


@pytest.mark.asyncio
async def test_semaphore_same_instance_for_same_config() -> None:
    import at_comfy.downloader as dl

    dl._sem = None
    dl._sem_capacity = None
    c = ATComfyConfig(max_parallel_downloads=3)
    assert dl._sem_for(c) is dl._sem_for(c)
    dl._sem = None
    dl._sem_capacity = None
