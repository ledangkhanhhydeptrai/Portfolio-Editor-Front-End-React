import React from "react";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  description?: string;
}

export default function Checkbox({
  label,
  description,
  className = "",
  ...rest
}: CheckboxProps) {
  return (
    <label
      className={`relative inline-flex cursor-pointer items-start gap-2.5 font-body text-[0.9375rem] text-ink ${className}`}
    >
      <input
        type="checkbox"
        className="peer absolute left-0 top-0 m-0 h-5 w-5 cursor-pointer opacity-0"
        {...rest}
      />
      <span
        aria-hidden="true"
        className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-md border-[1.5px] border-line bg-surface transition-colors
          peer-checked:border-accent peer-checked:bg-accent peer-disabled:opacity-50
          peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent
          peer-checked:[&>svg]:[stroke-dashoffset:0]"
      >
        <svg
          viewBox="0 0 12 12"
          className="h-3 w-3 fill-none stroke-accent-ink stroke-[3] [stroke-dasharray:20] [stroke-dashoffset:20] [stroke-linecap:round] [stroke-linejoin:round] motion-safe:transition-[stroke-dashoffset] motion-safe:duration-200"
        >
          <path d="M2 6.5l2.5 2.5L10 3.5" />
        </svg>
      </span>
      <span>
        {label}
        {description && (
          <small className="mt-0.5 block text-[0.8125rem] text-muted">
            {description}
          </small>
        )}
      </span>
    </label>
  );
}
