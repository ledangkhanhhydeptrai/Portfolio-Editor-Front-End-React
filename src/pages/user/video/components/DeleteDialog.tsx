import React, { useEffect } from "react";

interface DeleteDialogProps {
  /** Number of videos about to be deleted. */
  count: number;
  /** Title of the video when exactly one is being deleted. */
  title?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  count,
  title,
  onCancel,
  onConfirm
}) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="absolute inset-0 bg-slate-900/50" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h3
          id="delete-dialog-title"
          className="text-base font-semibold text-slate-900"
        >
          {count === 1
            ? `Delete “${title ?? "this video"}”?`
            : `Delete ${count} videos?`}
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          {count === 1
            ? "This video will be removed from your portfolio."
            : "These videos will be removed from your portfolio."}{" "}
          This can't be undone.
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            autoFocus
            onClick={onCancel}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
