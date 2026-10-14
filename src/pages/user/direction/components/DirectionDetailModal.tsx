import React from "react";
import { ExternalLink, Layers3, X } from "lucide-react";

import type { DirectionProps } from "../../../../services/direction/directionTypes";
import DirectionSkillAvatar from "./DirectionSkillAvatar";

interface DirectionDetailModalProps {
  direction: DirectionProps;
  onClose: () => void;
}

const DirectionDetailModal: React.FC<DirectionDetailModalProps> = ({
  direction,
  onClose
}) => {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="direction-modal-title"
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0E1015] shadow-2xl shadow-black/60 md:flex-row"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng popup"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0E1015] text-gray-400 transition hover:bg-white/[0.08] hover:text-gray-100"
        >
          <X size={17} />
        </button>

        {/* Direction Information */}
        <aside className="flex shrink-0 flex-col gap-4 overflow-y-auto border-b border-white/[0.07] bg-[#12141A] p-5 md:w-[300px] md:border-b-0 md:border-r">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10">
            <Layers3 size={23} className="text-teal-300" />
          </div>

          <div>
            <h2
              id="direction-modal-title"
              className="break-words text-xl font-semibold leading-snug text-gray-50"
            >
              {direction.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              {direction.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-teal-400/10 px-2.5 py-1 font-mono text-xs text-teal-200">
              {direction.code}
            </span>

            <span className="rounded-md bg-white/[0.05] px-2.5 py-1 text-xs text-gray-400">
              {direction.skills.length} kỹ năng
            </span>

            <span className="rounded-md bg-white/[0.05] px-2.5 py-1 text-xs text-gray-400">
              Thứ tự {direction.displayOrder}
            </span>
          </div>

          <div className="space-y-3 border-t border-white/[0.07] pt-4">
            <div>
              <p className="text-xs text-gray-500">ID định hướng</p>

              <p className="mt-1 break-all font-mono text-xs leading-5 text-gray-300">
                {direction.id}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Biểu tượng</p>

              <p className="mt-1 break-all font-mono text-xs leading-5 text-gray-300">
                {direction.icon}
              </p>
            </div>
          </div>
        </aside>

        {/* Skills */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col p-5 pt-14 md:pt-5">
          <div className="mb-4 flex shrink-0 items-center gap-2 pr-10">
            <h3 className="font-semibold text-gray-100">
              Kỹ năng trong định hướng
            </h3>

            <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-xs text-gray-400">
              {direction.skills.length}
            </span>
          </div>

          {direction.skills.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-14 text-center">
              <Layers3 size={30} className="text-gray-600" />

              <p className="mt-3 text-sm font-medium text-gray-300">
                Chưa có kỹ năng
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Định hướng này chưa có kỹ năng nào được gán.
              </p>
            </div>
          ) : (
            <div className="dir-scroll grid min-h-0 flex-1 auto-rows-min grid-cols-1 content-start gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
              {direction.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="rounded-xl border border-white/[0.07] bg-[#12141A] p-3.5 transition hover:border-teal-300/20"
                >
                  <div className="flex items-center gap-3">
                    <DirectionSkillAvatar
                      skill={skill}
                      size="h-11 w-11"
                      ring="border-white/10"
                      square
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-medium text-gray-100">
                        {skill.name}
                      </h4>

                      <span className="mt-1 inline-block max-w-full truncate rounded bg-teal-400/10 px-1.5 py-0.5 text-xs text-teal-200">
                        {skill.category}
                      </span>
                    </div>

                    <span className="shrink-0 text-xs text-gray-500">
                      #{skill.displayOrder}
                    </span>
                  </div>

                  <div className="mt-3 border-t border-white/[0.05] pt-3">
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-gray-500">
                      Skill ID
                    </p>

                    <p className="break-all font-mono text-[11px] leading-5 text-gray-400">
                      {skill.id}
                    </p>
                  </div>

                  <div className="mt-3">
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-gray-500">
                      Icon URL
                    </p>

                    {skill.iconUrl.length > 0 ? (
                      <a
                        href={skill.iconUrl}
                        target="_blank"
                        rel="noreferrer"
                        title={skill.iconUrl}
                        className="flex items-center gap-2 rounded-lg border border-white/[0.07] px-3 py-2 text-xs text-gray-400 transition hover:bg-white/[0.05] hover:text-teal-200"
                      >
                        <span className="min-w-0 flex-1 truncate">
                          {skill.iconUrl}
                        </span>

                        <ExternalLink size={13} className="shrink-0" />
                      </a>
                    ) : (
                      <p className="text-xs text-gray-500">Chưa có icon URL</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex shrink-0 justify-end border-t border-white/[0.07] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-teal-300 px-4 py-2 text-sm font-semibold text-[#08090C] transition hover:bg-teal-200"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectionDetailModal;
