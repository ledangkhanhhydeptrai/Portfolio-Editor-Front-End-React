import { SkillEnum } from "../../../../services/skill/SkillTypes";

export const CATEGORY_LABEL: Record<SkillEnum, string> = {
  DEVELOPMENT: "DEVELOPMENT",
  VIDEO_EDITING: "VIDEO_EDITING",
  DRIVING: "DRIVING"
};

export const CATEGORY_STYLE: Record<SkillEnum, string> = {
  DEVELOPMENT: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  VIDEO_EDITING: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  DRIVING: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
};

export const DEFAULT_PAGE_SIZE = 3;

// 0 = hiển thị tất cả
export const PAGE_SIZE_OPTIONS = [3, 5, 10, 20, 0];
