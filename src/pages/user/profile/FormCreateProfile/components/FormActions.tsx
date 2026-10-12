import React from "react";
import { ArrowRight, RotateCcw, Save } from "lucide-react";
import Button from "../../../../../components/ui/Button";

interface FormActionsProps {
  onReset: () => void;
}

export default function FormActions({ onReset }: FormActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-slate-500">
        Mục có dấu <span className="text-red-500">*</span> là bắt buộc.
      </p>

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <RotateCcw size={16} />
          Làm mới form
        </button>

        <Button type="submit" className="sm:min-w-40">
          <Save size={17} />
          Tạo hồ sơ
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
