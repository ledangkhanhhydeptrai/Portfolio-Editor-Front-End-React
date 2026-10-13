import type { SkillEnum } from "../../../../services/skill/SkillTypes";

export const PAGE_SIZE_OPTIONS = [3, 6, 9, 12, 0];
export const DEFAULT_PAGE_SIZE = 3;

export type FeaturedFilter = "ALL" | "FEATURED" | "NORMAL";
export type SortOrder = "asc" | "desc";

export const CATEGORY_LABELS: Record<SkillEnum, string> = {
  DEVELOPMENT: "Phát triển phần mềm",
  VIDEO_EDITING: "Dựng video",
  DRIVING: "Tài xế lái xe"
};

/** Màu theo danh mục, đồng bộ với trang kỹ năng. */
export const CATEGORY_BADGE: Record<SkillEnum, string> = {
  DEVELOPMENT: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  VIDEO_EDITING: "border-purple-500/20 bg-purple-500/10 text-purple-400",
  DRIVING: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
};
