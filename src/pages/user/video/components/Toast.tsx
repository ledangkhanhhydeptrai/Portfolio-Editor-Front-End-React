import React from "react";
import { Check, X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => (
  <div
    role="status"
    className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm text-white shadow-lg"
  >
    <Check size={16} className="text-emerald-400" />
    {message}
    <button
      type="button"
      onClick={onClose}
      aria-label="Dismiss"
      className="-mr-1 ml-1 rounded p-0.5 text-slate-400 hover:text-white"
    >
      <X size={14} />
    </button>
  </div>
);

export default Toast;
