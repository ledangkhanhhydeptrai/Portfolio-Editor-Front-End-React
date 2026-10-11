import React from "react";
import { Check, Copy } from "lucide-react";
import type { WorkStyleTheme } from "./theme";
import Highlight from "./Highlight";

interface CopyIdButtonProps {
  id: string;
  /** Từ khóa tìm kiếm hiện tại, dùng để tô sáng phần ID khớp. */
  keyword: string;
  t: WorkStyleTheme;
  /** Hiển thị đầy đủ ID (dùng cho card mobile). */
  full?: boolean;
}

const COPY_RESET_MS = 1500;
const TRUNCATE_THRESHOLD = 12;

const CopyIdButton: React.FC<CopyIdButtonProps> = ({
  id,
  keyword,
  t,
  full = false
}) => {
  const [copied, setCopied] = React.useState<boolean>(false);
  const timerRef = React.useRef<number | null>(null);

  // Dọn timer khi unmount hoặc khi bấm liên tiếp.
  React.useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);

      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        setCopied(false);
        timerRef.current = null;
      }, COPY_RESET_MS);
    } catch {
      setCopied(false);
    }
  };

  const shown: string =
    full || id.length <= TRUNCATE_THRESHOLD
      ? id
      : `${id.slice(0, 8)}…${id.slice(-4)}`;

  return (
    <div className="inline-flex max-w-full items-center gap-1">
      <code
        title={id}
        className={`min-w-0 rounded-md px-2 py-1 font-mono text-xs ${t.muted} ${t.codeChip} ${
          full ? "break-all" : "truncate"
        }`}
      >
        <Highlight text={shown} keyword={keyword} />
      </code>

      <button
        type="button"
        onClick={() => void handleCopy()}
        aria-label={copied ? "Đã sao chép ID" : "Sao chép ID"}
        title={copied ? "Đã sao chép" : "Sao chép ID"}
        className={`shrink-0 rounded-md p-1.5 transition active:scale-90 ${t.focusRing} ${
          copied ? "bg-emerald-500/10 text-emerald-500" : t.ghostBtn
        }`}
      >
        {copied ? (
          <Check size={14} aria-hidden="true" />
        ) : (
          <Copy size={14} aria-hidden="true" />
        )}
      </button>

      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Đã sao chép ID" : ""}
      </span>
    </div>
  );
};

export default CopyIdButton;
