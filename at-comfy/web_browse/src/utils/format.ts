/** Binary units (1024); one decimal when >= 10 of a unit, else whole numbers for small values. */

const UNITS = ["B", "KB", "MB", "GB", "TB"] as const;

export function formatBytes(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n) || n < 0) return "";
  if (n === 0) return "0 B";
  let v = n;
  let u = 0;
  while (v >= 1024 && u < UNITS.length - 1) {
    v /= 1024;
    u += 1;
  }
  const dec = v >= 10 || u === 0 ? 0 : 1;
  const s = dec === 0 ? Math.round(v).toString() : v.toFixed(1);
  return `${s} ${UNITS[u]}`;
}

/** Bytes per second → ``12.3 MB/s`` style. */
export function formatRate(bps: number | null | undefined): string {
  if (bps == null || !Number.isFinite(bps) || bps <= 0) return "";
  const s = formatBytes(bps);
  return s ? `${s}/s` : "";
}

/** Progress line: ``12.3 / 200 MB · 1.2 MB/s`` or subsets (see plan). */
export function formatDownloadProgressLine(
  state: string,
  bytesDone: number,
  totalBytes: number | null,
  rateBps: number | null,
): string {
  const s = String(state || "").toLowerCase();
  const hasTotal = totalBytes != null && totalBytes > 0;
  const doneStr = formatBytes(bytesDone);
  const totalStr = hasTotal ? formatBytes(totalBytes!) : "";
  const rateStr = s === "downloading" ? formatRate(rateBps) : "";

  if (!hasTotal && (!Number.isFinite(bytesDone) || bytesDone <= 0)) return "";

  if (s === "completed" && hasTotal) {
    return totalStr;
  }

  if (!hasTotal) {
    return doneStr;
  }

  const progress = `${doneStr} / ${totalStr}`;
  if (s === "downloading" && rateStr) return `${progress} · ${rateStr}`;
  return progress;
}
