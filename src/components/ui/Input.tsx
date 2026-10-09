import React, { useId } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  hint,
  error,
  icon,
  id,
  className = "",
  disabled,
  ...rest
}: InputProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const msgId = `${inputId}-msg`;
  const msg = error ?? hint;
  return (
    <div className={`flex flex-col gap-1.5 font-body text-ink ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold">
          {label}
        </label>
      )}
      <div
        className={`flex min-h-11 items-center gap-2 rounded-xl border-[1.5px] px-3.5 transition focus-within:ring-4 ${
          error
            ? "border-danger bg-surface focus-within:ring-danger-soft"
            : "border-line bg-surface hover:border-accent/40 focus-within:border-accent focus-within:ring-accent-soft"
        } ${disabled ? "bg-surface2 opacity-60" : ""}`}
      >
        {icon && (
          <span aria-hidden="true" className="inline-flex shrink-0 text-muted">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={msg ? msgId : undefined}
          className="w-full min-w-0 flex-1 bg-transparent text-[0.9375rem] text-ink outline-none placeholder:text-muted/70"
          {...rest}
        />
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
