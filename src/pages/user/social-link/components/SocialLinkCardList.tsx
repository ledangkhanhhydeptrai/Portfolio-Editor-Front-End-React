import React from "react";
import { ArrowUpRight, Copy, Check, Eye, Pencil, Trash2 } from "lucide-react";
import { SocialLinkProps } from "../../../../services/social-link/SocialLinkTypes";
import {
  SocialLinkIcon,
  getHostname,
  useCopyToClipboard,
  focusRing
} from "./SocialLinkShared";

interface SocialLinkCardListProps {
  items: SocialLinkProps[];
  isDark: boolean;
  onView?: (item: SocialLinkProps) => void;
  onEdit?: (item: SocialLinkProps) => void;
  onDelete?: (item: SocialLinkProps) => void;
}

export const SocialLinkCardList: React.FC<SocialLinkCardListProps> = ({
  items,
  isDark,
  onView,
  onEdit,
  onDelete
}) => {
  const { copiedId, copy } = useCopyToClipboard();

  return (
    <ul
      className={`divide-y md:hidden ${
        isDark ? "divide-white/[0.06]" : "divide-zinc-100"
      }`}
    >
      {items.map((item) => {
        const copied = copiedId === item.id;
        return (
          <li key={item.id} className="p-4">
            <div className="flex items-center gap-3">
              <SocialLinkIcon
                src={item.iconUrl}
                alt={item.platform}
                isDark={isDark}
                className="h-11 w-11"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium leading-tight">{item.platform}</p>
                <p className="mt-0.5 truncate text-xs text-zinc-500">
                  {getHostname(item.url)}
                </p>
              </div>
              <span
                className={`inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-xs font-medium tabular-nums ${
                  isDark
                    ? "bg-white/[0.06] text-zinc-300"
                    : "bg-zinc-100 text-zinc-600"
                }`}
                title="Thứ tự hiển thị"
              >
                #{item.displayOrder}
              </span>
            </div>

            <p
              className={`mt-3 break-all rounded-lg px-3 py-2 font-mono text-xs ${
                isDark
                  ? "bg-black/30 text-zinc-400"
                  : "bg-zinc-50 text-zinc-500"
              }`}
            >
              {item.url}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => void copy(item.id, item.url)}
                className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition ${focusRing} ${
                  isDark
                    ? "bg-white/[0.06] text-zinc-200 hover:bg-white/10"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-500" />
                    Đã sao chép
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Sao chép
                  </>
                )}
              </button>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 text-xs font-medium text-white transition hover:bg-indigo-500 ${focusRing}`}
              >
                Truy cập
                <ArrowUpRight size={14} />
              </a>
            </div>

            {(onView || onEdit || onDelete) && (
              <div
                className={`mt-2 flex items-center justify-between border-t pt-2 ${
                  isDark ? "border-white/[0.06]" : "border-zinc-100"
                }`}
              >
                {onView && (
                  <button
                    type="button"
                    onClick={() => onView(item)}
                    className={`inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition ${focusRing} ${
                      isDark
                        ? "text-zinc-300 hover:bg-white/[0.06]"
                        : "text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    <Eye size={14} />
                    Chi tiết
                  </button>
                )}
                {onEdit && (
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className={`inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition ${focusRing} ${
                      isDark
                        ? "text-zinc-300 hover:bg-white/[0.06]"
                        : "text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    <Pencil size={14} />
                    Sửa
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(item)}
                    className={`inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition ${focusRing} ${
                      isDark
                        ? "text-red-400 hover:bg-red-500/10"
                        : "text-red-600 hover:bg-red-50"
                    }`}
                  >
                    <Trash2 size={14} />
                    Xóa
                  </button>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
