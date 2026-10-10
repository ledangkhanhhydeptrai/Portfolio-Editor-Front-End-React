import React from "react";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import type { WorkStyleTheme } from "./theme";
import type { WorkStyleProps } from "../../../../services/work-style/WorkStyleTypes";
import { dangerBtn, secondaryBtn } from "./ButtonStyles";
import Modal from "./Modal";

interface DeleteDialogProps {
  t: WorkStyleTheme;
  item: WorkStyleProps | null;
  isDeleting: boolean;
  error?: string | null;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  t,
  item,
  isDeleting,
  error,
  onClose,
  onConfirm,
}) => (
  <Modal
    open={item !== null}
    onClose={onClose}
    t={t}
    title="Xóa phong cách làm việc"
    maxWidth="max-w-md"
    busy={isDeleting}
    footer={
      <>
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className={secondaryBtn(t)}
        >
          Hủy
        </button>
        <button
          type="button"
          onClick={() => void onConfirm()}
          disabled={isDeleting}
          className={dangerBtn}
        >
          {isDeleting && (
            <LoaderCircle size={15} className="animate-spin motion-reduce:animate-none" />
          )}
          Xóa
        </button>
      </>
    }
  >
    {item && (
      <div className="flex gap-3">
        <div className="h-fit shrink-0 rounded-full bg-red-500/10 p-2.5 text-red-500">
          <TriangleAlert size={20} />
        </div>
        <div className="text-sm leading-6">
          <p>
            Bạn sắp xóa phong cách <strong>{item.title}</strong>. Hành động này
            không thể hoàn tác.
          </p>
          {error && (
            <p role="alert" className="mt-2 text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
    )}
  </Modal>
);

export default DeleteDialog;