import React from "react";
import { Link, useParams } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ChevronRight,
  Code2,
  Video,
  CarFront,
  Pencil,
  Layers,
  Hash,
  Image as ImageIcon,
  Fingerprint,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  LoaderCircle
} from "lucide-react";
import { useSkill } from "../../../hooks/useSkill";

const LIST_PATH = "/skills";

interface CategoryMeta {
  label: string;
  icon: LucideIcon;
  badge: string;
  glow: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  DEVELOPMENT: {
    label: "Development",
    icon: Code2,
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    glow: "bg-blue-500/20"
  },
  VIDEO_EDITING: {
    label: "Video Editing",
    icon: Video,
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    glow: "bg-purple-500/20"
  },
  DRIVING: {
    label: "Driving",
    icon: CarFront,
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    glow: "bg-emerald-500/20"
  }
};

const FALLBACK_META: CategoryMeta = {
  label: "Khác",
  icon: Layers,
  badge: "bg-white/5 text-white/60 border-white/10",
  glow: "bg-[#7F96F5]/20"
};

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

function InfoRow({ icon: Icon, label, children, action }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#AAB9FF]">
        <Icon size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-white/45">{label}</p>
        <div className="mt-0.5 truncate text-[15px] font-medium text-white/90">
          {children}
        </div>
      </div>

      {action}
    </div>
  );
}

interface CopyButtonProps {
  copied: boolean;
  onClick: () => void;
  title: string;
}

function CopyButton({ copied, onClick, title }: CopyButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className={`flex size-9 shrink-0 items-center justify-center rounded-lg border transition ${
        copied
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          : "border-white/[0.08] text-white/50 hover:border-[#7F96F5]/30 hover:bg-[#7F96F5]/10 hover:text-[#AAB9FF]"
      }`}
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
    </button>
  );
}

export default function SkillIdPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useSkill(id || "");
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      setCopiedKey(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#0B0B0D]">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle className="size-8 animate-spin text-[#7F96F5]" />
          <p className="text-sm text-white/45">Đang tải thông tin kỹ năng...</p>
        </div>
      </div>
    );
  }

  if (isError || !data || !data.data) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#0B0B0D] px-4 text-center">
        <div className="rounded-full border border-red-500/20 bg-red-500/10 p-4">
          <AlertCircle className="size-8 text-red-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">
          Không tìm thấy kỹ năng
        </h2>
        <p className="max-w-sm text-sm text-white/45">
          Kỹ năng này không tồn tại hoặc đã bị xóa. Hãy quay lại danh sách và
          chọn lại.
        </p>
        <Link
          to={LIST_PATH}
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#7F96F5] px-4 text-sm font-semibold text-[#0B0B0D] transition hover:opacity-90"
        >
          <ArrowLeft size={16} />
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const skill = data.data;
  const meta = CATEGORY_META[skill.category] ?? FALLBACK_META;
  const CategoryIcon = meta.icon;
  const editPath = `${LIST_PATH}/${id}/edit`;

  return (
    // min-h-full thay cho min-h-screen: layout bên ngoài đã có header,
    // min-h-screen (100vh) làm trang luôn cao hơn khung nhìn nên bị cắt ở đáy.
    <div className="min-h-full bg-[#0B0B0D] px-4 py-5 text-[#F0EFEA]">
      <div className="space-y-5">
        {/* Breadcrumb + action */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-white/45"
          >
            <Link
              to={LIST_PATH}
              className="inline-flex items-center gap-1.5 transition hover:text-[#AAB9FF]"
            >
              <ArrowLeft size={15} />
              Quản lý kỹ năng
            </Link>
            <ChevronRight size={14} className="text-white/25" />
            <span className="max-w-[240px] truncate text-white/80">
              {skill.name}
            </span>
          </nav>

          <Link
            to={editPath}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#7F96F5] px-5 text-sm font-semibold text-[#0B0B0D] transition hover:opacity-90"
          >
            <Pencil size={15} />
            Chỉnh sửa
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* ===== Cột trái: hero + thông tin chi tiết ===== */}
          <div className="space-y-5 lg:col-span-2">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#121216]">
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute -right-24 -top-24 size-72 rounded-full blur-3xl ${meta.glow}`}
              />

              <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-lg shadow-black/30">
                  {skill.iconUrl ? (
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      className="size-full object-contain p-3.5"
                    />
                  ) : (
                    <CategoryIcon size={38} className="text-[#AAB9FF]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${meta.badge}`}
                  >
                    <CategoryIcon size={13} />
                    {meta.label}
                  </span>

                  <h1 className="mt-2 break-words text-3xl font-bold tracking-tight">
                    {skill.name}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/45">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.05] px-2.5 py-1.5">
                      <Hash size={13} />
                      Thứ tự hiển thị: {skill.displayOrder}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy("id", String(skill.id))}
                      title="Sao chép ID"
                      className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-white/[0.05] px-2.5 py-1.5 transition hover:bg-white/[0.09] hover:text-white/70"
                    >
                      <Fingerprint size={13} className="shrink-0" />
                      <span className="max-w-[220px] truncate">{skill.id}</span>
                      {copiedKey === "id" ? (
                        <Check size={13} className="shrink-0 text-emerald-400" />
                      ) : (
                        <Copy size={13} className="shrink-0" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Thông tin chi tiết */}
            <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121216]">
              <div className="border-b border-white/[0.08] px-5 py-3.5">
                <h2 className="text-base font-semibold">Thông tin chi tiết</h2>
                <p className="mt-0.5 text-sm text-white/40">
                  Dữ liệu của kỹ năng đang hiển thị trên portfolio.
                </p>
              </div>

              {/* Tên / Danh mục / Thứ tự nằm chung một hàng để tiết kiệm chiều cao */}
              <div className="grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <InfoRow icon={Code2} label="Tên kỹ năng">
                  {skill.name}
                </InfoRow>

                <InfoRow icon={Layers} label="Danh mục">
                  {meta.label}
                  <span className="ml-2 text-xs font-normal text-white/30">
                    {skill.category}
                  </span>
                </InfoRow>

                <InfoRow icon={Hash} label="Thứ tự hiển thị">
                  {skill.displayOrder}
                </InfoRow>
              </div>

              <div className="border-t border-white/[0.06]">
                <InfoRow
                  icon={ImageIcon}
                  label="Icon URL"
                  action={
                    skill.iconUrl ? (
                      <div className="flex shrink-0 gap-2">
                        <CopyButton
                          title="Sao chép URL"
                          copied={copiedKey === "icon"}
                          onClick={() => handleCopy("icon", skill.iconUrl)}
                        />
                        <a
                          href={skill.iconUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="Mở ảnh ở tab mới"
                          aria-label="Mở ảnh ở tab mới"
                          className="flex size-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/50 transition hover:border-[#7F96F5]/30 hover:bg-[#7F96F5]/10 hover:text-[#AAB9FF]"
                        >
                          <ExternalLink size={15} />
                        </a>
                      </div>
                    ) : undefined
                  }
                >
                  {skill.iconUrl ? (
                    <span
                      title={skill.iconUrl}
                      className="text-sm font-normal text-white/70"
                    >
                      {skill.iconUrl}
                    </span>
                  ) : (
                    <span className="text-sm font-normal text-white/35">
                      Chưa có icon
                    </span>
                  )}
                </InfoRow>
              </div>
            </section>
          </div>

          {/* ===== Cột phải ===== */}
          <div className="space-y-5">
            <section className="rounded-2xl border border-white/[0.08] bg-[#121216] p-5">
              <h2 className="text-base font-semibold">Xem trước icon</h2>
              <p className="mt-0.5 text-sm text-white/40">
                Icon trên nền tối và nền sáng.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { key: "dark", bg: "bg-[#0B0B0D] border-white/10" },
                  { key: "light", bg: "bg-white border-white" }
                ].map((tile) => (
                  <div
                    key={tile.key}
                    className={`flex h-24 items-end justify-center gap-3 rounded-xl border pb-4 ${tile.bg}`}
                  >
                    {skill.iconUrl ? (
                      [40, 28, 18].map((size) => (
                        <img
                          key={size}
                          src={skill.iconUrl}
                          alt=""
                          style={{ width: size, height: size }}
                          className="object-contain"
                        />
                      ))
                    ) : (
                      <CategoryIcon
                        size={36}
                        className={
                          tile.key === "dark"
                            ? "text-[#AAB9FF]"
                            : "text-[#4F63C9]"
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/[0.08] bg-[#121216] p-5">
              <h2 className="text-base font-semibold">Thao tác nhanh</h2>

              <div className="mt-3 space-y-2.5">
                <Link
                  to={editPath}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/10 text-sm font-medium text-white/80 transition hover:border-[#7F96F5]/30 hover:bg-[#7F96F5]/10 hover:text-[#AAB9FF]"
                >
                  <Pencil size={15} />
                  Cập nhật kỹ năng
                </Link>

                <Link
                  to={LIST_PATH}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/10 text-sm font-medium text-white/80 transition hover:bg-white/[0.05]"
                >
                  <ArrowLeft size={15} />
                  Danh sách kỹ năng
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}