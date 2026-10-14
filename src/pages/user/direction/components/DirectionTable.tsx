import React from "react";
import { Code2, Eye, Pencil, Trash2 } from "lucide-react";
import type { DirectionProps } from "../../../../services/direction/directionTypes";
import DirectionSkillAvatar from "./DirectionSkillAvatar";
import { useNavigate } from "react-router-dom";

interface DirectionTableProps {
  directions: DirectionProps[];
  onSelectDirection: (direction: DirectionProps) => void;
  onUpdateDirection: (direction: DirectionProps) => void;
  onDeleteDirection: (direction: DirectionProps) => void;
}

const iconBtn =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:bg-white/[0.08] hover:text-gray-100";

const DirectionTable: React.FC<DirectionTableProps> = ({
  directions,
  onSelectDirection,
  onUpdateDirection,
  onDeleteDirection
}) => {
  const navigate = useNavigate();

  return (
    <div className="dir-scroll min-h-0 flex-1 overflow-auto">
      <table className="w-full min-w-[780px] border-collapse text-left">
        <thead className="sticky top-0 z-10 bg-[#12141A]">
          <tr className="border-b border-white/[0.07] text-xs font-medium text-gray-500">
            <th className="w-14 px-5 py-3 text-center">#</th>
            <th className="px-5 py-3">Định hướng</th>
            <th className="px-5 py-3">Mã</th>
            <th className="px-5 py-3">Kỹ năng</th>
            <th className="px-5 py-3 text-center">Thứ tự</th>
            <th className="px-5 py-3 text-right">Thao tác</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/[0.05]">
          {directions.map((direction, index) => {
            const extra = direction.skills.length - 4;

            return (
              <tr
                key={direction.id}
                onClick={() => {
                  onSelectDirection(direction);
                }}
                className="cursor-pointer transition hover:bg-white/[0.03]"
              >
                <td className="px-5 py-3 text-center text-xs text-gray-500">
                  {index + 1}
                </td>

                <td className="px-5 py-3">
                  <div className="flex max-w-md items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-400/10">
                      <Code2 size={19} className="text-teal-300" />
                    </div>

                    <div className="min-w-0">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onSelectDirection(direction);
                        }}
                        className="block max-w-full truncate text-left font-medium text-gray-100 hover:text-teal-200"
                      >
                        {direction.title}
                      </button>

                      <p className="mt-0.5 max-w-sm truncate text-xs text-gray-500">
                        {direction.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-3">
                  <span className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-xs text-gray-300">
                    {direction.code}
                  </span>
                </td>

                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {direction.skills.slice(0, 4).map((skill) => (
                        <DirectionSkillAvatar
                          key={skill.id}
                          skill={skill}
                          size="h-7 w-7"
                          ring="border-[#0E1015]"
                        />
                      ))}

                      {extra > 0 && (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0E1015] bg-[#1B1E27] text-[10px] font-medium text-gray-300">
                          +{extra}
                        </span>
                      )}
                    </div>

                    <span className="text-xs text-gray-400">
                      {direction.skills.length} kỹ năng
                    </span>
                  </div>
                </td>

                <td className="px-5 py-3 text-center text-sm text-gray-400">
                  {direction.displayOrder}
                </td>

                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onUpdateDirection(direction);
                      }}
                      title="Cập nhật định hướng"
                      aria-label={`Cập nhật ${direction.title}`}
                      className={`${iconBtn} hover:border-teal-300/30 hover:text-teal-300`}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/directions/${direction.id}`);
                      }}
                      title="Xem danh sách kỹ năng"
                      aria-label={`Xem kỹ năng của ${direction.title}`}
                      className={iconBtn}
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDeleteDirection(direction);
                      }}
                      title="Xóa định hướng"
                      aria-label={`Xóa ${direction.title}`}
                      className={`${iconBtn} hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DirectionTable;
