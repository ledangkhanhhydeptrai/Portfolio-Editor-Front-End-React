import React, { useId } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> {
  options: SelectOption[];
  label?: string;
  hint?: string;
  error?: string;
  placeholder?: string;
}

export default function Select({
  options,
  label,
  hint,
  error,
  placeholder,
  id,
  className = "",
  disabled,
  ...rest
}: SelectProps) {
  const auto = useId();
  const selectId = id ?? auto;
  const msgId = `${selectId}-msg`;
  const msg = error ?? hint;
  return (
    <div className={`flex flex-col gap-1.5 font-body text-ink ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-semibold">
          {label}
        </label>
      )}
      <div
        className={`relative flex min-h-11 items-center rounded-xl border-[1.5px] px-3.5 transition focus-within:ring-4 ${
          error
            ? "border-danger bg-surface focus-within:ring-danger-soft"
            : "border-line bg-surface hover:border-accent/40 focus-within:border-accent focus-within:ring-accent-soft"
        } ${disabled ? "bg-surface2 opacity-60" : ""}`}
      >
        <select
          id={selectId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={msg ? msgId : undefined}
          className="w-full min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-6 text-[0.9375rem] text-ink outline-none [&>option]:text-[#162033]"
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3.5 text-muted"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </div>
      {msg && (
        <span
          id={msgId}
          className={`text-[0.8125rem] ${error ? "text-danger" : "text-muted"}`}
        >
          {msg}
        </span>
      )}
    </div>
  );
}
