import React from "react";
import { X } from "lucide-react";
import { SkillProps } from "../../../../services/skill/SkillTypes";
import CategoryBadge from "./CategoryBadge";

interface SkillDetailModalProps {
  skill: SkillProps | null;
  onClose: () => void;
}

interface DetailRowProps {
  label: string;
  children: React.ReactNode;
}

function DetailRow({ label, children }: DetailRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3">
      <dt className="text-white/45">{label}</dt>
      <dd className="min-w-0 break-all text-right text-white/80">{children}</dd>
    </div>
  );
}

export default function SkillDetailModal({
  skill,
  onClose
}: SkillDetailModalProps) {
  // Đóng modal bằng phím Escape
  React.useEffect(() => {
    if (skill === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [skill, onClose]);

  if (skill === null) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Chi tiết kỹ năng ${skill.name}`}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121216] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
          <h3 className="text-lg font-semibold">Chi tiết kỹ năng</h3>
          <button
            type="button"
            title="Đóng"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex items-center gap-4">
            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04]">
              <img
                src={skill.iconUrl}
                alt={skill.name}
                className="size-full object-contain p-3"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xl font-semibold">{skill.name}</p>
              <div className="mt-2">
                <CategoryBadge category={skill.category} />
              </div>
            </div>
          </div>

          <dl className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm">
            <DetailRow label="ID">{skill.id}</DetailRow>
            <DetailRow label="Tên kỹ năng">{skill.name}</DetailRow>
            <DetailRow label="Danh mục">{skill.category}</DetailRow>
            <DetailRow label="Thứ tự hiển thị">{skill.displayOrder}</DetailRow>
            <DetailRow label="Icon URL">
              <a
                href={skill.iconUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#AAB9FF] hover:underline"
              >
                {skill.iconUrl}
              </a>
            </DetailRow>
          </dl>
        </div>

        <div className="flex justify-end border-t border-white/[0.08] px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center rounded-xl border border-white/10 px-4 text-sm transition hover:bg-white/[0.05]"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
