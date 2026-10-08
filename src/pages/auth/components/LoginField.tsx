import React from "react";

interface FieldProps {
  id: string;
  label: string;
  type: string;
  name: string;
  autoComplete: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  icon: React.ReactNode;
  trailing?: React.ReactNode;
  onKeyEvent?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlurField?: () => void;
}

const inputClass =
  "peer h-[clamp(3.5rem,7.2vh,4rem)] w-full rounded-2xl " +
  "border border-white/10 bg-white/5 pb-1 pl-14 pr-5 pt-6 " +
  "text-[17px] font-medium text-white " +
  "placeholder-transparent transition hover:border-white/20 " +
  "focus:border-[#7c8bff] focus:bg-white/[0.08] " +
  "focus:outline-none focus:ring-4 focus:ring-[#5b6cff]/25 " +
  "[&:-webkit-autofill]:[-webkit-text-fill-color:#fff] " +
  "[&:-webkit-autofill]:[transition:background-color_600000s_0s,color_600000s_0s]";

const labelClass =
  "pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 " +
  "text-[17px] font-medium text-white/50 transition-all duration-200 " +
  "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[13px] " +
  "peer-focus:text-[#a5b4fc] " +
  "peer-[:not(:placeholder-shown)]:top-3 " +
  "peer-[:not(:placeholder-shown)]:translate-y-0 " +
  "peer-[:not(:placeholder-shown)]:text-[13px] " +
  "peer-[:not(:placeholder-shown)]:text-white/70 " +
  "peer-[:-webkit-autofill]:top-3 " +
  "peer-[:-webkit-autofill]:translate-y-0 " +
  "peer-[:-webkit-autofill]:text-[13px]";

const LoginField = ({
  id,
  label,
  type,
  name,
  autoComplete,
  value,
  onChange,
  className,
  icon,
  trailing,
  onKeyEvent,
  onBlurField
}: FieldProps): React.ReactElement => {
  const trailingClass = trailing ? "pr-16" : "";
  const extraClass = className ? className : "";

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder=" "
        value={value}
        onChange={
          onChange ? (event) => onChange(event.target.value) : undefined
        }
        onKeyDown={onKeyEvent}
        onKeyUp={onKeyEvent}
        onBlur={onBlurField}
        required
        className={`${inputClass} ${trailingClass} ${extraClass}`}
      />

      <label htmlFor={id} className={labelClass}>
        {label}
      </label>

      {icon}
      {trailing}
    </div>
  );
};

export default LoginField;
