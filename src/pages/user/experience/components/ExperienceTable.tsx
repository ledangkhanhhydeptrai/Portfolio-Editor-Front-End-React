import { Building2, Clock3, Trash2 } from "lucide-react";
import type { ExperienceProps } from "../../../../services/experience/ExperienceTypes";
import { formatDate } from "../utils";
import { StatusBadge } from "./StatusBadge";
import { useNavigate } from "react-router-dom";
import { useDeleteExperience } from "../../../../hooks/useExperience";
import React from "react";
import { Notifications } from "../../../../components/ui/Notification";
import { Alert, Snackbar } from "@mui/material";

const th =
  "sticky top-0 z-10 bg-[#12131A] px-4 py-2.5 text-xs font-medium text-gray-400 shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]";

interface ExperienceTableProps {
  items: ExperienceProps[];
}

export function ExperienceTable({ items }: ExperienceTableProps) {
  const navigate = useNavigate();
  const deleteExperience = useDeleteExperience();
  const [notification, setNotification] = React.useState<Notifications>({
    open: false,
    message: "",
    severity: "error"
  });
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    experience: ExperienceProps
  ) => {
    event.stopPropagation();

    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa kinh nghiệm tại "${experience.companyName}" không?`
    );

    if (!confirmed) {
      return;
    }

    deleteExperience.mutate(experience.id);
    setNotification({
      open: true,
      message: "Xóa kinh nghiệm thành công",
      severity: "success"
    });
  };

  return (
    <>
      <table className="hidden w-full min-w-[950px] border-collapse text-left md:table">
        <thead>
          <tr>
            <th className={th}>Công ty & Vị trí</th>
            <th className={th}>Thời gian công tác</th>
            <th className={th}>Mô tả công việc</th>
            <th className={`${th} text-right`}>Trạng thái</th>
            <th className={`${th} text-center`}>Thao tác</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/[0.05]">
          {items.map((experience) => (
            <tr
              key={experience.id}
              className="cursor-pointer transition-colors hover:bg-white/[0.02]"
              onClick={() => navigate(`/experiences/${experience.id}`)}
            >
              <td className="px-4 py-2.5 align-middle">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#8B9FF8]">
                    <Building2 size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-5 text-white">
                      {experience.companyName}
                    </p>
                    <p className="text-xs font-medium leading-4 text-[#8B9FF8]">
                      {experience.position}
                    </p>
                  </div>
                </div>
              </td>

              <td className="whitespace-nowrap px-4 py-2.5 align-middle">
                <div className="inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-[#090A0D]/60 px-2 py-1 text-xs text-gray-300">
                  <Clock3 size={12} className="text-gray-400" />
                  <span>{formatDate(experience.startDate)}</span>
                  <span className="text-gray-600">—</span>
                  <span
                    className={
                      experience.isCurrent ? "font-medium text-emerald-400" : ""
                    }
                  >
                    {experience.isCurrent
                      ? "Hiện tại"
                      : formatDate(experience.endDate)}
                  </span>
                </div>
              </td>

              <td className="px-4 py-2.5 align-middle">
                <p
                  title={experience.description}
                  className="max-w-[420px] truncate text-xs text-gray-300"
                >
                  {experience.description}
                </p>
              </td>

              <td className="whitespace-nowrap px-4 py-2.5 text-right align-middle">
                <StatusBadge isCurrent={experience.isCurrent} />
              </td>

              <td className="px-4 py-2.5 text-center align-middle">
                <button
                  type="button"
                  title="Xóa kinh nghiệm"
                  aria-label={`Xóa kinh nghiệm tại ${experience.companyName}`}
                  disabled={deleteExperience.isPending}
                  onClick={(event) => handleDelete(event, experience)}
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-red-400/20 bg-red-500/10 text-red-400 transition-colors hover:border-red-400/40 hover:bg-red-500/20 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => {
          setNotification((prev) => ({
            ...prev,
            open: false
          }));
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Alert
          onClose={() => {
            setNotification((prev) => ({
              ...prev,
              open: false
            }));
          }}
          severity={notification.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "12px",
            fontSize: "14px"
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}
