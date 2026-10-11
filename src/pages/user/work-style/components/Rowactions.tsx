import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { WorkStyleTheme } from "./theme";

import type { WorkStyleProps } from "../../../../services/work-style/WorkStyleTypes";
import type { RowActionHandlers } from "./types";

interface RowActionsProps {
  t: WorkStyleTheme;
  item: WorkStyleProps;
  actions: RowActionHandlers;
}

const BTN_BASE: string =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg transition active:scale-90";

const ICON_SIZE = 16;

const RowActions: React.FC<RowActionsProps> = ({ t, item, actions }) => (
  <div
    role="group"
    aria-label={`Thao tác với ${item.title}`}
    className="flex items-center justify-end gap-1"
  >
    <button
      type="button"
      title="Xem chi tiết"
      aria-label={`Xem chi tiết ${item.title}`}
      onClick={() => actions.onView(item)}
      className={`${BTN_BASE} ${t.focusRing} ${t.ghostBtn}`}
    >
      <Eye size={ICON_SIZE} aria-hidden="true" />
    </button>

    <button
      type="button"
      title="Cập nhật"
      aria-label={`Cập nhật ${item.title}`}
      onClick={() => actions.onEdit(item)}
      className={`${BTN_BASE} ${t.focusRing} text-[#7F96F5] hover:bg-[#7F96F5]/15 hover:text-[#6B83E8]`}
    >
      <Pencil size={ICON_SIZE} aria-hidden="true" />
    </button>

    <button
      type="button"
      title="Xóa"
      aria-label={`Xóa ${item.title}`}
      onClick={() => actions.onDelete(item)}
      className={`${BTN_BASE} focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-600`}
    >
      <Trash2 size={ICON_SIZE} aria-hidden="true" />
    </button>
  </div>
);

export default RowActions;