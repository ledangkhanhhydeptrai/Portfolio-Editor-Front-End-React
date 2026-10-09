import React from "react";

interface IconButtonProps {
  label: string;
  onClick: () => void;
  danger?: boolean;
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  label,
  onClick,
  danger = false,
  children
}) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    aria-label={label}
    className={`rounded-lg p-2 text-slate-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
      danger
        ? "hover:bg-red-50 hover:text-red-600"
        : "hover:bg-slate-100 hover:text-slate-900"
    }`}
  >
    {children}
  </button>
);

export default IconButton;
