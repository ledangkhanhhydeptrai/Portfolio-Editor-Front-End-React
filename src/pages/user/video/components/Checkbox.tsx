import React from "react";

interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  indeterminate = false,
  onChange,
  label
}) => (
  <input
    type="checkbox"
    aria-label={label}
    checked={checked}
    onChange={onChange}
    ref={(element) => {
      if (element) element.indeterminate = indeterminate;
    }}
    className="h-4 w-4 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
  />
);

export default Checkbox;
