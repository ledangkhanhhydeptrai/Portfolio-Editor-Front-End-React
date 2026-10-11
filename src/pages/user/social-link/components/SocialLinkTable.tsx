import React from "react";
import { ArrowUpRight, Copy, Check, Eye, Pencil, Trash2 } from "lucide-react";
import { SocialLinkProps } from "../../../../services/social-link/SocialLinkTypes";
import {
  SocialLinkIcon,
  getHostname,
  useCopyToClipboard,
  focusRing
} from "./SocialLinkShared";

interface SocialLinkTableProps {
  items: SocialLinkProps[];
  isDark: boolean;
  onView?: (item: SocialLinkProps) => void;
  onEdit?: (item: SocialLinkProps) => void;
  onDelete?: (item: SocialLinkProps) => void;
}

export const SocialLinkTable: React.FC<SocialLinkTableProps> = ({
  items,
  isDark,
  onView,
  onEdit,
  onDelete
}) => {
  const { copiedId, copy } = useCopyToClipboard();

  const iconBtn = `inline-flex h-8 w-8 items-center justify-center rounded-lg transition ${focusRing} ${
    isDark
      ? "text-zinc-400 hover:bg-white/10 hover:text-white"
      : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
  }`;

  const dangerBtn = `inline-flex h-8 w-8 items-center justify-center rounded-lg transition ${focusRing} ${
    isDark
      ? "text-zinc-400 hover:bg-red-500/15 hover:text-red-400"
      : "text-zinc-500 hover:bg-red-50 hover:text-red-600"
  }`;

  const divider = (
    <span
      aria-hidden="true"
      className={`mx-1 h-4 w-px ${isDark ? "bg-white/10" : "bg-zinc-200"}`}
    />
  );

  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full text-left text-sm">
        <thead>
          <tr
            className={`border-b text-xs font-medium ${
              isDark
                ? "border-white/[0.07] text-zinc-500"
                : "border-zinc-100 text-zinc-500"
            }`}
          >
            <th scope="col" className="px-6 py-3 font-medium">
              Nền tảng
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Đường dẫn
            </th>
            <th scope="col" className="w-24 px-6 py-3 text-center font-medium">
              Thứ tự
            </th>
            <th scope="col" className="w-60 px-6 py-3 text-right font-medium">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody
          className={`divide-y ${isDark ? "divide-white/[0.05]" : "divide-zinc-100"}`}
        >
          {items.map((item) => {
            const copied = copiedId === item.id;
            return (
              <tr
                key={item.id}
                className={`group transition-colors ${
                  isDark ? "hover:bg-white/[0.025]" : "hover:bg-zinc-50/80"
                }`}
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3.5">
                    <SocialLinkIcon
                      src={item.iconUrl}
                      alt={item.platform}
                      isDark={isDark}
                    />
                    <div className="min-w-0">
                      <p className="font-medium leading-tight">
                        {item.platform}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        {getHostname(item.url)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="max-w-md px-6 py-3.5">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.url}
                    className={`block truncate rounded font-mono text-xs text-zinc-500 transition hover:text-indigo-500 ${focusRing}`}
                  >
                    {item.url}
                  </a>
                </td>

                <td className="px-6 py-3.5 text-center">
                  <span
                    className={`inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-xs font-medium tabular-nums ${
                      isDark
                        ? "bg-white/[0.06] text-zinc-300"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {item.displayOrder}
                  </span>
                </td>

                <td className="px-6 py-3.5">
                  <div className="flex items-center justify-end gap-0.5">
                    <button
                      type="button"
                      onClick={() => void copy(item.id, item.url)}
                      aria-label={
                        copied
                          ? "Đã sao chép"
                          : `Sao chép liên kết ${item.platform}`
                      }
                      title={copied ? "Đã sao chép" : "Sao chép liên kết"}
                      className={iconBtn}
                    >
                      {copied ? (
                        <Check size={15} className="text-emerald-500" />
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Mở ${item.platform}`}
                      title={`Mở ${item.platform}`}
                      className={iconBtn}
                    >
                      <ArrowUpRight size={16} />
                    </a>

                    {(onView || onEdit || onDelete) && divider}

                    {onView && (
                      <button
                        type="button"
                        onClick={() => onView(item)}
                        aria-label={`Xem chi tiết ${item.id}`}
                        title="Xem chi tiết"
                        className={iconBtn}
                      >
                        <Eye size={15} />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        aria-label={`Chỉnh sửa ${item.platform}`}
                        title="Chỉnh sửa"
                        className={iconBtn}
                      >
                        <Pencil size={15} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        aria-label={`Xóa ${item.platform}`}
                        title="Xóa"
                        className={dangerBtn}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
