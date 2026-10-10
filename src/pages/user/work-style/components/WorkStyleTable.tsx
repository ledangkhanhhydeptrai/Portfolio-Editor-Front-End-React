import React from "react";
import { ListOrdered } from "lucide-react";
import type { WorkStyleTheme } from "./theme";

import type { WorkStyleProps } from "../../../../services/work-style/WorkStyleTypes";
import Highlight from "./Highlight";
import CopyIdButton from "./CopyIdButton";
import { RowActionHandlers } from "./types";
import RowActions from "./Rowactions";

interface Props {
  t: WorkStyleTheme;
  items: WorkStyleProps[];
  keyword: string;
  actions: RowActionHandlers;
}

export const StyleAvatar: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#7F96F5]/25 to-[#7F96F5]/10 text-sm font-bold text-[#7F96F5]">
    {title.trim().charAt(0).toUpperCase() || "?"}
  </div>
);

export const OrderBadge: React.FC<{ value: number }> = ({ value }) => (
  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#7F96F5]/10 px-2.5 py-1.5 text-xs font-semibold tabular-nums text-[#7F96F5]">
    <ListOrdered size={14} />
    {value}
  </span>
);

/** Chia cột dùng chung cho hàng tiêu đề và các hàng dữ liệu. */
const COLUMNS =
  "md:grid-cols-[3rem_minmax(12rem,1.2fr)_minmax(16rem,3fr)_5rem_11rem_7rem]";

/**
 * Bảng dựng bằng flex + grid (thay cho <table>) để các hàng giãn đều,
 * lấp đầy chiều cao còn lại của card. Mỗi hàng giãn tối đa 8rem để trang
 * cuối chỉ có 1-2 dòng không bị kéo cao quá mức.
 */
const WorkStyleTable: React.FC<Props> = ({ t, items, keyword, actions }) => (
  <div className="hidden overflow-x-auto md:flex md:flex-1 md:flex-col">
    <div
      role="table"
      aria-label="Danh sách phong cách làm việc"
      className="flex min-w-[980px] flex-1 flex-col text-sm"
    >
      <div role="rowgroup">
        <div
          role="row"
          className={`grid items-center gap-x-4 px-5 py-2.5 font-medium ${COLUMNS} ${t.thead}`}
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

      <div role="rowgroup" className="flex flex-1 flex-col">
        {items.map((item, index) => (
          <div
            key={item.id}
            role="row"
            className={`grid max-h-32 flex-1 items-center gap-x-4 border-t px-5 py-2.5 transition-colors ${COLUMNS} ${t.divider} ${t.rowHover}`}
          >
            <div role="cell" className={`tabular-nums ${t.muted}`}>
              {index + 1}
            </div>

            <div role="cell" className="flex min-w-0 items-center gap-3">
              <StyleAvatar title={item.title} />
              <span className="font-semibold">
                <Highlight text={item.title} keyword={keyword} />
              </span>
            </div>

            <div role="cell" className={`min-w-0 leading-5 ${t.muted}`}>
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

            <div role="cell">
              <RowActions t={t} item={item} actions={actions} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default WorkStyleTable;
