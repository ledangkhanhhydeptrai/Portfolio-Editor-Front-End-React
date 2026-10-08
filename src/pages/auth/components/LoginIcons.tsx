import React from "react";

interface EyeIconProps {
  off: boolean;
}

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true
};

export const MailIcon = (): React.ReactElement => (
  <svg
    className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-white/40 transition-colors peer-focus:text-[#a5b4fc]"
    {...svgProps}
  >
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const LockIcon = (): React.ReactElement => (
  <svg
    className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-white/40 transition-colors peer-focus:text-[#a5b4fc]"
    {...svgProps}
  >
    <rect x="4" y="10" width="16" height="10" rx="3" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

export const EyeIcon = ({ off }: EyeIconProps): React.ReactElement => (
  <svg className="h-6 w-6" {...svgProps}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M4 4l16 16" />}
  </svg>
);

export const ShieldIcon = (): React.ReactElement => (
  <svg className="h-5 w-5" {...svgProps}>
    <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const CheckIcon = (): React.ReactElement => (
  <svg className="h-4 w-4" {...svgProps} strokeWidth={2.4}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const Spinner = (): React.ReactElement => (
  <svg
    className="h-5 w-5 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeOpacity="0.3"
      strokeWidth="3"
    />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
