import React from "react";
import type { WorkStyleTheme } from "./theme";

import type { WorkStyleProps } from "../../../../services/work-style/WorkStyleTypes";
import Highlight from "./Highlight";
import CopyIdButton from "./CopyIdButton";

import { OrderBadge, StyleAvatar } from "./WorkStyleTable";
import { RowActionHandlers } from "./types";
import RowActions from "./Rowactions";

interface Props {
  t: WorkStyleTheme;
  items: WorkStyleProps[];
  keyword: string;
  actions: RowActionHandlers;
}

const WorkStyleCardList: React.FC<Props> = ({ t, items, keyword, actions }) => (
  <div className="grid flex-1 grid-cols-1 content-start gap-2.5 p-3 md:hidden">
    {items.map((item) => (
      <article
        key={item.id}
        className={`rounded-xl border p-3.5 ${
          t.isDark ? "border-white/10 bg-white/[0.02]" : "border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <StyleAvatar title={item.title} />
          <h3 className="min-w-0 flex-1 font-semibold">
            <Highlight text={item.title} keyword={keyword} />
          </h3>
          <OrderBadge value={item.displayOrder} />
        </div>

        <p className={`mt-2.5 text-sm leading-5 ${t.muted}`}>
          <Highlight text={item.description} keyword={keyword} />
        </p>

        <div className={`mt-2.5 space-y-2 border-t pt-2.5 ${t.divider}`}>
          <CopyIdButton id={item.id} keyword={keyword} t={t} full />
          <RowActions t={t} item={item} actions={actions} />
        </div>
      </article>
    ))}
  </div>
);

export default WorkStyleCardList;