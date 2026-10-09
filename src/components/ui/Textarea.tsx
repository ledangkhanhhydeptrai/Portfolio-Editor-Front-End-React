import React, { useId } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export default function Textarea({
  label,
  hint,
  error,
  id,
  className = "",
  disabled,
  value,
  maxLength,
  ...rest
}: TextareaProps) {
  const auto = useId();
  const areaId = id ?? auto;
  const msgId = `${areaId}-msg`;
  const msg = error ?? hint;
  return (
    <div className={`flex flex-col gap-1.5 font-body text-ink ${className}`}>
      {label && (
        <label htmlFor={areaId} className="text-sm font-semibold">
          {label}
        </label>
      )}
      <div
        className={`flex items-start rounded-xl border-[1.5px] px-3.5 py-3 transition focus-within:ring-4 ${
          error
            ? "border-danger bg-surface focus-within:ring-danger-soft"
            : "border-line bg-surface hover:border-accent/40 focus-within:border-accent focus-within:ring-accent-soft"
        } ${disabled ? "bg-surface2 opacity-60" : ""}`}
      >
        <textarea
          id={areaId}
          disabled={disabled}
          value={value}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={msg ? msgId : undefined}
          className="min-h-24 w-full min-w-0 flex-1 resize-y bg-transparent text-[0.9375rem] leading-relaxed text-ink outline-none placeholder:text-muted/70"
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
      {maxLength && typeof value === "string" && (
        <span className="self-end text-xs tabular-nums text-muted">
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  );
}
