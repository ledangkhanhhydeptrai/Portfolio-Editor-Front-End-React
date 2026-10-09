import type { SortKey } from "./types";

export const PAGE_SIZE = 10;

export const sortLabels: Record<SortKey, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  views: "Most viewed",
  title: "Title A–Z"
};