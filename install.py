"""ComfyUI-Manager runs this after clone to install the pip-packaged ``at_comfy`` backend."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

_HERE = Path(__file__).resolve().parent


def main() -> None:
    at_comfy = _HERE / "at-comfy"
    if not at_comfy.is_dir():
        raise FileNotFoundError(f"Missing backend package directory: {at_comfy}")
    subprocess.check_call([sys.executable, "-m", "pip", "install", str(at_comfy)])


if __name__ == "__main__":
    main()
