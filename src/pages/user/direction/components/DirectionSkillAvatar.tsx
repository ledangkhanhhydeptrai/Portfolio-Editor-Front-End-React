import React from "react";
import { Code2 } from "lucide-react";
import type { DirectionProps } from "../../../../services/direction/directionTypes";

type SkillProps = DirectionProps["skills"][number];

interface DirectionSkillAvatarProps {
  skill: SkillProps;
  size: string;
  ring: string;
  square?: boolean;
}

const DirectionSkillAvatar: React.FC<DirectionSkillAvatarProps> = ({
  skill,
  size,
  ring,
  square = false
}) => {
  const [failed, setFailed] = React.useState(false);

  const showImage = skill.iconUrl.length > 0 && !failed;

  return (
    <span
      title={skill.name}
      className={`flex shrink-0 items-center justify-center overflow-hidden border-2 bg-[#171922] ${size} ${ring} ${
        square ? "rounded-xl" : "rounded-full"
      }`}
    >
      {showImage ? (
        <img
          src={skill.iconUrl}
          alt={skill.name}
          loading="lazy"
          className="h-[65%] w-[65%] object-contain"
          onError={() => {
            setFailed(true);
          }}
        />
      ) : (
        <Code2 size={14} className="text-teal-300" />
      )}
    </span>
  );
};

export default DirectionSkillAvatar;
