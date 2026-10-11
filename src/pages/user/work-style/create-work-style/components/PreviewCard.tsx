import React from "react";
import { ListOrdered } from "lucide-react";
import type { PreviewCardProps } from "./types";

const PreviewCard: React.FC<PreviewCardProps> = ({
  title,
  description,
  displayOrder
}) => {
  const cleanTitle = title.trim();
  const cleanDescription = description.trim();

  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-dashed border-line bg-surface2 p-4"
    >
      <p className="text-sm font-semibold text-ink">Xem trước</p>
      <p className="mb-4 mt-0.5 text-xs text-muted">
        Cập nhật ngay khi bạn nhập.
      </p>

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-sm font-bold text-accent">
          {cleanTitle.charAt(0).toUpperCase() || "?"}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p
              className={`truncate text-sm font-semibold ${
                cleanTitle ? "text-ink" : "text-muted/70"
              }`}
            >
              {cleanTitle || "Tên phong cách"}
            </p>

            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold tabular-nums text-accent">
              <ListOrdered size={12} />
              {displayOrder > 0 ? displayOrder : "–"}
            </span>
          </div>

          <p
            className={`mt-1.5 line-clamp-5 break-words text-sm leading-6 ${
              cleanDescription ? "text-muted" : "text-muted/60"
            }`}
          >
            {cleanDescription || "Mô tả sẽ hiển thị ở đây."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
