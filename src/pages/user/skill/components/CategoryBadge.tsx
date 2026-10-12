import { Code2, Video, CarFront } from "lucide-react";
import { SkillEnum } from "../../../../services/skill/SkillTypes";
import { CATEGORY_LABEL, CATEGORY_STYLE } from "./skillConstants";

interface CategoryBadgeProps {
  category: SkillEnum;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium ${CATEGORY_STYLE[category]}`}
    >
      {category === "DEVELOPMENT" && <Code2 size={13} />}
      {category === "VIDEO_EDITING" && <Video size={13} />}
      {category === "DRIVING" && <CarFront size={13} />}
      {CATEGORY_LABEL[category]}
    </span>
  );
}
