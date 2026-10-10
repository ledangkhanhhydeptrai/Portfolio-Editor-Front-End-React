import React from "react";
import { Check, Copy } from "lucide-react";
import type { WorkStyleTheme } from "./theme";

interface CopyIdButtonProps {
  id: string;
  keyword: string;
  t: WorkStyleTheme;
  /** Hiển thị đầy đủ ID (dùng cho card mobile). */
  full?: boolean;
}

const CopyIdButton: React.FC<CopyIdButtonProps> = ({ id, t, full = false }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const shown =
    full || id.length <= 12 ? id : `${id.slice(0, 8)}…${id.slice(-4)}`;

  return (
    <div className="inline-flex max-w-full items-center gap-1.5">
      <code
        title={id}
        className={`rounded-md px-2 py-1 font-mono text-xs ${t.muted} ${
          t.isDark ? "bg-white/5" : "bg-gray-100"
        } ${full ? "break-all" : ""}`}
      >
        {shown}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Đã sao chép ID" : "Sao chép ID"}
        className={`rounded-md p-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F96F5] ${
          copied ? "text-emerald-500" : t.ghostBtn
        }`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
};

export default CopyIdButton;
