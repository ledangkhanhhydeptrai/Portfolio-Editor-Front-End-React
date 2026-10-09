import { VideoEnum } from "../services/video/VideoTypes";

/** "PRODUCT_VIDEO" -> "Product Video" */
export const formatCategory = (value: VideoEnum): string => {
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const toSeconds = (duration: string) =>
  duration
    .split(":")
    .map(Number)
    .reduce((total, part) => total * 60 + (Number.isFinite(part) ? part : 0), 0);

/** Sum of all durations, e.g. "1h 05m", "12m 30s". */
export const formatTotalDuration = (videos: { duration: string }[]) => {
  const total = videos.reduce((sum, v) => sum + toSeconds(v.duration), 0);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  if (m > 0) return `${m}m ${String(s).padStart(2, "0")}s`;
  return `${s}s`;
};