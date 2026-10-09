import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "neutral" | "accent" | "success" | "warning" | "danger";
  dot?: boolean;
  className?: string;
}

const variants = {
  neutral: "bg-surface2 text-ink",
  accent: "bg-accent-soft text-accent",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger"
};

export default function Badge({
  children,
  variant = "neutral",
  dot = false,
  className = ""
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-[3px] font-body text-[0.78rem] font-semibold leading-snug ${variants[variant]} ${className}`}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-current"
        />
      )}
      {children}
    </span>
  );
}
