import type { SortKey } from "./types";

export const PAGE_SIZE = 3;

export const sortLabels: Record<SortKey, string> = {
  newest: "Mới nhất",
  oldest: "Cũ nhất",
  views: "Lượt xem nhiều nhất",
  title: "Tiêu đề A–Z"
};