import React from "react";
import { AlertCircle } from "lucide-react";

import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";

import {
  PreviewCard,
  FORM_ID,
  DESCRIPTION_ID,
  DESCRIPTION_HINT_ID,
  TITLE_MAX,
  DESCRIPTION_MAX,
  DESCRIPTION_WARN_AT,
} from "./components";

import type { CreateWorkStyleModalProps } from "./components";

const CreateWorkStyleModal: React.FC<CreateWorkStyleModalProps> = ({
  open,
  displayOrder,
  setDisplayOrder,
  title,
  setTitle,
  description,
  setDescription,
  onSubmit,
  onClose,
  isSaving = false,
  error = null,
}) => {
  const descriptionNearLimit =
    description.length >= DESCRIPTION_WARN_AT;

  const handleSubmitClick = () => {
    const form = document.getElementById(FORM_ID);

    if (form instanceof HTMLFormElement) {
      form.requestSubmit();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Tạo phong cách làm việc"
      size="xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSaving}
          >
            Hủy
          </Button>

          <Button
            type="button"
            onClick={handleSubmitClick}
            disabled={isSaving}
          >
            {isSaving ? "Đang tạo..." : "Tạo phong cách"}
          </Button>
        </div>
      }
    >
      <form
        id={FORM_ID}
        onSubmit={onSubmit}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <div>
              <Input
                label="Tên phong cách"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Nhập tên phong cách làm việc"
                required
                maxLength={TITLE_MAX}
              />

              <p className="mt-1 text-right text-xs text-muted">
                {title.length}/{TITLE_MAX}
              </p>
            </div>

            <div>
              <Input
                label="Thứ tự hiển thị"
                name="displayOrder"
                type="number"
                value={String(displayOrder)}
                onChange={(event) =>
                  setDisplayOrder(Number(event.target.value))
                }
                min={1}
                step={1}
                required
              />
            </div>

            <div>
              <label
                htmlFor={DESCRIPTION_ID}
                className="mb-2 block text-sm font-medium text-ink"
              >
                Mô tả
              </label>

              <textarea
                id={DESCRIPTION_ID}
                name="description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Mô tả phong cách làm việc..."
                rows={5}
                maxLength={DESCRIPTION_MAX}
                required
                aria-describedby={DESCRIPTION_HINT_ID}
                className="w-full resize-y rounded-xl border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20"
              />

              <div
                id={DESCRIPTION_HINT_ID}
                className="mt-1 flex items-center justify-between gap-3"
              >
                <p
                  className={`text-xs ${
                    descriptionNearLimit
                      ? "text-amber-600"
                      : "text-muted"
                  }`}
                >
                  {descriptionNearLimit
                    ? "Bạn sắp đạt giới hạn ký tự."
                    : "Mô tả ngắn gọn, dễ hiểu."}
                </p>

                <span
                  className={`shrink-0 text-xs tabular-nums ${
                    descriptionNearLimit
                      ? "text-amber-600"
                      : "text-muted"
                  }`}
                >
                  {description.length}/{DESCRIPTION_MAX}
                </span>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-600"
              >
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <p className="break-words">{error}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <PreviewCard
              title={title}
              description={description}
              displayOrder={displayOrder}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateWorkStyleModal;
