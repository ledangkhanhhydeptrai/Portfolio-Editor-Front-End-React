import React from "react";
import { Pencil } from "lucide-react";
import type { WorkStyleTheme } from "./theme";
import type { WorkStyleProps } from "../../../../services/work-style/WorkStyleTypes";

import CopyIdButton from "./CopyIdButton";
import { OrderBadge, StyleAvatar } from "./WorkStyleTable";
import Modal from "./Modal";
import { primaryBtn, secondaryBtn } from "./ButtonStyles";


interface DetailModalProps {
  t: WorkStyleTheme;
  item: WorkStyleProps | null;
  onClose: () => void;
  onEdit: (item: WorkStyleProps) => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ t, item, onClose, onEdit }) => (
  <Modal
    open={item !== null}
    onClose={onClose}
    t={t}
    title="Chi tiết phong cách làm việc"
    footer={
      item && (
        <>
          <button type="button" onClick={onClose} className={secondaryBtn(t)}>
            Đóng
          </button>
          <button type="button" onClick={() => onEdit(item)} className={primaryBtn}>
            <Pencil size={15} />
            Cập nhật
          </button>
        </>
      )
    }
  >
    {item && (
      <div>
        <div className="flex items-center gap-3">
          <StyleAvatar title={item.title} />
          <h3 className="min-w-0 flex-1 text-lg font-semibold">{item.title}</h3>
          <OrderBadge value={item.displayOrder} />
        </div>

        <dl className="mt-5 space-y-4 text-sm">
          <div>
            <dt className={`mb-1 text-xs ${t.muted}`}>Mô tả</dt>
            <dd className="whitespace-pre-line leading-6">{item.description}</dd>
          </div>
          <div>
            <dt className={`mb-1 text-xs ${t.muted}`}>ID</dt>
            <dd>
              <CopyIdButton id={item.id} keyword="" t={t} full />
            </dd>
          </div>
        </dl>
      </div>
    )}
  </Modal>
);

export default DetailModal;