import React from "react";
import { ListOrdered } from "lucide-react";
import type { WorkStyleTheme } from "./theme";

import type { WorkStyleProps } from "../../../../services/work-style/WorkStyleTypes";
import Highlight from "./Highlight";
import CopyIdButton from "./CopyIdButton";
import { RowActionHandlers } from "./types";
import RowActions from "./Rowactions";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  t: WorkStyleTheme;
  items: WorkStyleProps[];
  keyword: string;
  actions: RowActionHandlers;
  startIndex: number;
}

interface StyleAvatarProps {
  title: string;
}

interface OrderBadgeProps {
  value: number;
}

/* -------------------------------------------------------------------------- */
/*                               Small components                             */
/* -------------------------------------------------------------------------- */

export const StyleAvatar: React.FC<StyleAvatarProps> = ({ title }) => (
  <div
    aria-hidden="true"
    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7F96F5]/30 to-[#7F96F5]/10 text-sm font-bold text-[#7F96F5] ring-1 ring-inset ring-[#7F96F5]/20 transition-transform duration-200 group-hover:scale-105"
  >
    {title.trim().charAt(0).toUpperCase() || "?"}
  </div>
);

export const OrderBadge: React.FC<OrderBadgeProps> = ({ value }) => (
  <span
    className="inline-flex min-w-[3.25rem] items-center justify-center gap-1.5 rounded-full bg-[#7F96F5]/10 px-2.5 py-1 text-xs font-semibold tabular-nums text-[#7F96F5] ring-1 ring-inset ring-[#7F96F5]/20"
    title={`Thứ tự hiển thị: ${value}`}
  >
    <ListOrdered size={13} aria-hidden="true" />
    {value}
  </span>
);

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

/** Chia cột dùng chung cho hàng tiêu đề và các hàng dữ liệu. */
const COLUMNS: string =
  "md:grid-cols-[3rem_minmax(12rem,1.2fr)_minmax(16rem,3fr)_5rem_11rem_7rem]";

/* -------------------------------------------------------------------------- */
/*                                    Table                                   */
/* -------------------------------------------------------------------------- */

/**
 * Bảng dựng bằng flex + grid (thay cho <table>) để các hàng giãn đều,
 * lấp đầy chiều cao còn lại của card. Mỗi hàng giãn tối đa 8rem để trang
 * cuối chỉ có 1-2 dòng không bị kéo cao quá mức.
 */
const WorkStyleTable: React.FC<Props> = ({
  t,
  items,
  keyword,
  actions,
  startIndex,
}) => (
  <div className="hidden overflow-x-auto md:flex md:flex-1 md:flex-col">
    <div
      role="table"
      aria-label="Danh sách phong cách làm việc"
      aria-rowcount={items.length + 1}
      className="flex min-w-[980px] flex-1 flex-col text-sm"
    >
      {/* Header */}
      <div role="rowgroup">
        <div
          role="row"
          className={`grid items-center gap-x-4 px-6 py-3 text-xs font-semibold tracking-wide ${COLUMNS} ${t.thead}`}
        >
          <div role="columnheader">STT</div>
          <div role="columnheader">Tên phong cách</div>
          <div role="columnheader">Mô tả</div>
          <div role="columnheader">Thứ tự</div>
          <div role="columnheader">ID</div>
          <div role="columnheader" className="text-right">
            Thao tác
          </div>
        </div>
      </div>

      {/* Body */}
      <div role="rowgroup" className="flex flex-1 flex-col">
        {items.map((item, index) => (
          <div
            key={item.id}
            role="row"
            aria-rowindex={index + 2}
            className={`group relative grid max-h-32 flex-1 items-center gap-x-4 border-t px-6 py-3 transition-colors duration-150 ${COLUMNS} ${t.divider} ${t.rowHover}`}
          >
            {/* Vạch nhấn khi hover / focus trong hàng */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-2 left-0 w-1 rounded-r-full bg-[#7F96F5] opacity-0 transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100"
            />

            <div
              role="cell"
              className={`text-xs font-medium tabular-nums ${t.muted}`}
            >
              {startIndex + index + 1}
            </div>

            <div role="cell" className="flex min-w-0 items-center gap-3">
              <StyleAvatar title={item.title} />
              <span className="truncate font-semibold" title={item.title}>
                <Highlight text={item.title} keyword={keyword} />
              </span>
            </div>

            <div role="cell" className={`min-w-0 leading-6 ${t.muted}`}>
              <p className="line-clamp-2" title={item.description}>
                <Highlight text={item.description} keyword={keyword} />
              </p>
            </div>

            <div role="cell">
              <OrderBadge value={item.displayOrder} />
            </div>

            <div role="cell" className="min-w-0">
              <CopyIdButton id={item.id} keyword={keyword} t={t} />
            </div>

            <div role="cell" className="flex justify-end">
              <RowActions t={t} item={item} actions={actions} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default WorkStyleTable;