import React, { useId } from "react";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

export default function Switch({
  checked,
  onChange,
  label,
  disabled,
  className = ""
}: SwitchProps) {
  const id = useId();
  return (
    <div
      className={`inline-flex items-center gap-3 font-body text-[0.9375rem] text-ink ${className}`}
    >
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative h-[26px] w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          checked ? "bg-accent" : "bg-line"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute left-[3px] top-[3px] h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-[18px]" : ""
          }`}
        />
      </button>
      <label
        htmlFor={id}
        className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
      >
        {label}
      </label>
    </div>
  );
}
