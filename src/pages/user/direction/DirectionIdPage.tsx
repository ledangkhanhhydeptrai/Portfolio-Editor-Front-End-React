import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  Layers3,
  Code2,
  ExternalLink,
  AlertCircle,
  LoaderCircle
} from "lucide-react";

import { useGetDirection } from "../../../hooks/useDirection";
import type { DirectionProps } from "../../../services/direction/directionTypes";
import DirectionSkillAvatar from "./components/DirectionSkillAvatar";

const panel = "rounded-2xl border border-white/[0.07] bg-[#0E1015]";

const ghostBtn =
  "inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-gray-300 transition hover:bg-white/[0.09] disabled:cursor-not-allowed disabled:opacity-50";

const primaryBtn =
  "inline-flex items-center gap-2 rounded-lg bg-teal-300 px-4 py-2 text-sm font-semibold text-[#08090C] transition hover:bg-teal-200";

const DirectionIdPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isFetching
  } = useGetDirection(id || "");

  const direction: DirectionProps | null = React.useMemo(() => {
    if (!response) {
      return null;
    }

    if ("data" in response) {
      const result = response.data;

      if (result && typeof result === "object" && "id" in result) {
        return result as DirectionProps;
      }

      return null;
    }

    if ("id" in response) {
      return response as DirectionProps;
    }

    return null;
  }, [response]);

  const goBack = () => navigate(-1);

  const renderBody = () => {
    if (!id) {
      return (
        <StateView
          icon={<AlertCircle size={26} className="text-red-400" />}
          title="Thiếu ID định hướng"
          description="Không tìm thấy ID định hướng trên đường dẫn."
          action={
            <button type="button" onClick={goBack} className={primaryBtn}>
              <ArrowLeft size={16} />
              Quay lại
            </button>
          }
        />
      );
    }

    if (isLoading) {
      return (
        <StateView
          icon={<LoaderCircle size={26} className="animate-spin text-teal-300" />}
          title="Đang tải thông tin định hướng..."
          description="Vui lòng chờ trong giây lát."
        />
      );
    }

    if (isError) {
      return (
        <StateView
          icon={<AlertCircle size={26} className="text-red-400" />}
          title="Không thể tải định hướng"
          description="Đã xảy ra lỗi khi lấy thông tin. Hãy thử tải lại dữ liệu."
          action={
            <button
              type="button"
              onClick={() => {
                void refetch();
              }}
              className={primaryBtn}
            >
              <RefreshCw size={15} />
              Thử lại
            </button>
          }
        />
      );
    }

    if (!direction) {
      return (
        <StateView
          icon={<Layers3 size={26} className="text-gray-500" />}
          title="Không tìm thấy định hướng"
          description="Định hướng không tồn tại hoặc dữ liệu trả về không hợp lệ."
          action={
            <button type="button" onClick={goBack} className={ghostBtn}>
              <ArrowLeft size={16} />
              Quay lại danh sách
            </button>
          }
        />
      );
    }

    return (
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-1">
        {/* ── Trái: thông tin định hướng ── */}
        <section
          className={`${panel} flex min-h-0 min-w-0 flex-col gap-4 p-5 sm:p-6 lg:col-span-4`}
        >
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-400/10">
              <Layers3 size={23} className="text-teal-300" />
            </div>

            <div className="min-w-0">
              <h2 className="break-words text-xl font-semibold leading-snug tracking-tight text-gray-50">
                {direction.title}
              </h2>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-md bg-teal-400/10 px-2.5 py-1 font-mono text-xs text-teal-200">
                  {direction.code}
                </span>
                <span className="rounded-md bg-white/[0.05] px-2.5 py-1 text-xs text-gray-400">
                  Thứ tự {direction.displayOrder}
                </span>
                <span className="rounded-md bg-white/[0.05] px-2.5 py-1 text-xs text-gray-400">
                  {direction.skills.length} kỹ năng
                </span>
              </div>
            </div>
          </div>

          {/* Mô tả: chiếm phần còn lại, chỉ cuộn bên trong nếu quá dài */}
          <div className="min-h-[80px] flex-1 overflow-hidden">
            <div className="page-scroll h-full overflow-y-auto pr-2">
              <p
                className={`whitespace-pre-wrap break-words text-sm leading-7 ${
                  direction.description ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {direction.description || "Chưa có mô tả cho định hướng này."}
              </p>
            </div>
          </div>

          <div className="shrink-0 space-y-3 border-t border-white/[0.07] pt-4">
            <div>
              <p className="text-xs text-gray-500">ID định hướng</p>
              <p
                title={direction.id}
                className="mt-1 truncate font-mono text-xs text-gray-300"
              >
                {direction.id}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Đường dẫn biểu tượng</p>

              {direction.icon.length > 0 ? (
                <a
                  href={direction.icon}
                  target="_blank"
                  rel="noreferrer"
                  title={direction.icon}
                  className="mt-1 inline-flex max-w-full items-center gap-1.5 text-xs text-gray-300 transition hover:text-teal-200"
                >
                  <span className="truncate">{direction.icon}</span>
                  <ExternalLink size={13} className="shrink-0" />
                </a>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  Chưa có đường dẫn biểu tượng.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── Phải: danh sách kỹ năng ── */}
        <section
          className={`${panel} flex min-h-0 min-w-0 flex-col overflow-hidden lg:col-span-8`}
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/10">
                <Code2 size={18} className="text-teal-300" />
              </div>

              <div>
                <h2 className="font-semibold text-gray-100">
                  Kỹ năng trong định hướng
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Danh sách kỹ năng được gán cho định hướng này.
                </p>
              </div>
            </div>

            <span className="shrink-0 rounded-full bg-white/[0.06] px-3 py-1 text-xs text-gray-300">
              {direction.skills.length} kỹ năng
            </span>
          </div>

          {direction.skills.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
                <Code2 size={26} className="text-gray-600" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-gray-300">
                Chưa có kỹ năng
              </h3>

              <p className="mt-1 max-w-sm text-sm leading-6 text-gray-500">
                Định hướng này chưa được gán kỹ năng nào.
              </p>
            </div>
          ) : (
            <div className="page-scroll grid min-h-0 flex-1 auto-rows-min grid-cols-1 content-start gap-3 overflow-y-auto p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
              {direction.skills.map((skill) => (
                <article
                  key={skill.id}
                  className="rounded-xl border border-white/[0.07] bg-[#12141A] p-3.5"
                >
                  <div className="flex items-center gap-3">
                    <DirectionSkillAvatar
                      skill={skill}
                      size="h-11 w-11"
                      ring="border-white/10"
                      square
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium text-gray-100">
                        {skill.name}
                      </h3>

                      <span className="mt-1 inline-block max-w-full truncate rounded bg-teal-400/10 px-1.5 py-0.5 text-xs text-teal-200">
                        {skill.category}
                      </span>
                    </div>

                    <span className="shrink-0 text-xs text-gray-500">
                      #{skill.displayOrder}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <p
                      title={skill.id}
                      className="min-w-0 flex-1 truncate font-mono text-[11px] text-gray-500"
                    >
                      {skill.id}
                    </p>

                    {skill.iconUrl.length > 0 && (
                      <a
                        href={skill.iconUrl}
                        target="_blank"
                        rel="noreferrer"
                        title={skill.iconUrl}
                        aria-label={`Mở biểu tượng của ${skill.name}`}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 text-gray-400 transition hover:bg-white/[0.08] hover:text-teal-200"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col bg-[#08090C] text-gray-100 antialiased lg:h-[calc(100dvh-64px)] lg:overflow-hidden">
      <style>{`
        .page-scroll::-webkit-scrollbar{width:6px}
        .page-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:9999px}
        .page-scroll{scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.12) transparent}
      `}</style>

      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-4 p-4 sm:p-5">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              aria-label="Quay lại"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-gray-300 transition hover:bg-white/[0.09]"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-lg font-semibold leading-tight sm:text-xl">
                Chi tiết định hướng
              </h1>
              <p className="mt-0.5 hidden text-xs text-gray-500 sm:block">
                Thông tin định hướng và các kỹ năng được liên kết.
              </p>
            </div>
          </div>

          {id && (
            <button
              type="button"
              onClick={() => {
                void refetch();
              }}
              disabled={isFetching}
              className={ghostBtn}
            >
              <RefreshCw
                size={15}
                className={isFetching ? "animate-spin" : ""}
              />
              Làm mới
            </button>
          )}
        </header>

        {renderBody()}
      </div>
    </div>
  );
};

function StateView({
  icon,
  title,
  description,
  action
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={`${panel} flex min-h-[300px] flex-1 flex-col items-center justify-center p-8 text-center`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03]">
        {icon}
      </div>
      <h2 className="text-base font-semibold text-gray-100">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default DirectionIdPage;