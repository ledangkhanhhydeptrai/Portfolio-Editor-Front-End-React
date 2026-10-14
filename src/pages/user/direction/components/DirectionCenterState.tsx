import React from "react";

interface DirectionCenterStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

const DirectionCenterState: React.FC<DirectionCenterStateProps> = ({
  icon,
  title,
  description,
  action
}) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03]">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-gray-100">{title}</h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default DirectionCenterState;
