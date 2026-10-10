import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { WorkStyleTheme } from "./theme";

import type { WorkStyleProps } from "../../../../services/work-style/WorkStyleTypes";
import { RowActionHandlers } from "./types";

interface RowActionsProps {
  t: WorkStyleTheme;
  item: WorkStyleProps;
  actions: RowActionHandlers;
}

const btn =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F96F5]";

const RowActions: React.FC<RowActionsProps> = ({ t, item, actions }) => (
  <div className="flex items-center justify-end gap-1">
    <button
      type="button"
      title="Xem chi tiết"
      aria-label={`Xem chi tiết ${item.title}`}
      onClick={() => actions.onView(item)}
      className={`${btn} ${t.ghostBtn}`}
    >
      <Eye size={16} />
    </button>

    <button
      type="button"
      title="Cập nhật"
      aria-label={`Cập nhật ${item.title}`}
      onClick={() => actions.onEdit(item)}
      className={`${btn} text-[#7F96F5] hover:bg-[#7F96F5]/10`}
    >
      <Pencil size={16} />
    </button>

    <button
      type="button"
      title="Xóa"
      aria-label={`Xóa ${item.title}`}
      onClick={() => actions.onDelete(item)}
      className={`${btn} text-red-500 hover:bg-red-500/10`}
    >
      <Trash2 size={16} />
    </button>
  </div>
);

export default RowActions;
