import type { SkillEnum } from "../../../../services/skill/SkillTypes";
import { CATEGORY_BADGE, CATEGORY_LABELS } from "./ProjectConstants";

interface ProjectCategoryBadgeProps {
  category: SkillEnum;
}

export default function ProjectCategoryBadge({
  category
}: ProjectCategoryBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${CATEGORY_BADGE[category]}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
