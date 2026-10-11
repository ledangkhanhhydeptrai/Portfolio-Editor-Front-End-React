import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link2 } from "lucide-react";

/** Lấy tên miền gọn (bỏ www.) để hiển thị phụ đề. */
export const getHostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

/** Hook sao chép dùng chung cho Table và CardList. */
export function useCopyToClipboard(resetMs = 1800) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const copy = useCallback(
    async (id: string, text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        return;
      }
      setCopiedId(id);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopiedId(null), resetMs);
    },
    [resetMs]
  );

  return { copiedId, copy };
}

interface SocialLinkIconProps {
  src: string;
  alt: string;
  isDark: boolean;
  className?: string;
}

/** Ô icon nền tảng, tự rơi về icon liên kết nếu ảnh lỗi. */
export const SocialLinkIcon: React.FC<SocialLinkIconProps> = ({
  src,
  alt,
  isDark,
  className = "h-10 w-10"
}) => {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-xl p-2 ring-1 ring-inset ${className} ${
        isDark ? "bg-white/[0.04] ring-white/10" : "bg-zinc-50 ring-zinc-200"
      }`}
    >
      {failed || !src ? (
        <Link2 size={18} className="text-zinc-400" />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      )}
    </div>
  );
};

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60";