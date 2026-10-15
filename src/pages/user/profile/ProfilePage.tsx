import React from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  FileText,
  ExternalLink,
  Pencil,
  Quote,
  Globe,
  CalendarCheck,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useTheme } from "../../../contexts/ThemeContext";
import Modal from "../../../components/ui/Modal";
import UpdateFormProfile from "./UpdateFormProfile/UpdateFormProfile";
import { Alert, Snackbar } from "@mui/material";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

// Suy ra trực tiếp từ hook để luôn khớp với kiểu dữ liệu thật của dự án.
type CurrentUserData = ReturnType<typeof useCurrentUser>["data"];
type Profile = NonNullable<NonNullable<CurrentUserData>["data"]>;

type MaybeText = string | null | undefined;

interface SkeletonProps {
  className?: string;
}

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: MaybeText;
  /** Nếu có, giá trị được hiển thị dạng liên kết (mailto:, tel:...). */
  href?: string;
}

interface CompletenessItem {
  label: string;
  done: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

const hasText = (value: MaybeText): boolean =>
  Boolean(value && value.trim().length > 0);

const getInitials = (name: string): string => {
  const parts: string[] = name.trim().split(/\s+/);
  const first: string = parts[0] ?? "";
  const last: string = parts.length > 1 ? (parts[parts.length - 1] ?? "") : "";

  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase() || "?";
};

const focusRing: string =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

/* -------------------------------------------------------------------------- */
/*                               Small components                             */
/* -------------------------------------------------------------------------- */

const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => (
  <div
    className={`rounded-xl bg-surface2 motion-safe:animate-pulse ${className}`}
  />
);

const LoadingState: React.FC = () => (
  <div
    className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-4"
    role="status"
    aria-live="polite"
  >
    <span className="sr-only">Đang tải hồ sơ...</span>
    <Skeleton className="h-36 shrink-0 rounded-3xl" />
    <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <Skeleton className="min-h-60" />
      <Skeleton className="min-h-60" />
    </div>
  </div>
);

const SectionCard: React.FC<SectionCardProps> = ({
  icon,
  title,
  subtitle,
  children,
  className = "",
  bodyClassName = ""
}) => (
  <section
    className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface ${className}`}
  >
    <header className="flex shrink-0 items-center gap-3 border-b border-line px-4 py-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
        {icon}
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-0.5 text-xs text-muted">{subtitle}</p>
      </div>
    </header>

    <div className={`min-h-0 flex-1 overflow-hidden p-4 ${bodyClassName}`}>
      {children}
    </div>
  </section>
);

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, href }) => {
  const filled: boolean = hasText(value);

  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface2 text-muted">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted">{label}</p>

        {filled && href ? (
          <a
            href={href}
            className={`mt-0.5 block truncate rounded text-sm font-medium text-ink transition hover:text-accent ${focusRing}`}
            title={value ?? undefined}
          >
            {value}
          </a>
        ) : (
          <p
            className={`mt-0.5 truncate text-sm font-medium ${
              filled ? "text-ink" : "text-muted"
            }`}
            title={filled ? (value ?? undefined) : undefined}
          >
            {filled ? value : "Chưa cập nhật"}
          </p>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function ProfilePage(): React.JSX.Element {
  const { theme } = useTheme();
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch
  } = useCurrentUser();

  const profile: Profile | null = response?.data ?? null;

  /*
    <main> của UserLayout là flex-col + overflow-hidden, nên trang phải tự
    chiếm phần còn lại (flex-1 min-h-0). Từ lg trở lên trang KHÔNG cuộn:
    mọi khối co giãn (min-h-0) và văn bản dài được cắt bằng line-clamp để
    vừa khít khung. Dưới lg (mobile) trang vẫn cuộn bình thường.
  */
  const pageClass: string = `flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-3 transition-colors duration-300 sm:px-6 lg:overflow-hidden lg:px-6 lg:py-4 ${
    theme === "dark"
      ? "bg-[#0B0B0D] text-[#F0EFEA]"
      : "bg-[#F5F6FA] text-[#18181B]"
  }`;

  if (isLoading) {
    return (
      <div className={pageClass}>
        <LoadingState />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className={pageClass}>
        <div
          role="alert"
          className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center gap-4 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 ring-8 ring-red-500/5">
            <AlertCircle size={28} aria-hidden="true" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">
              Không thể tải hồ sơ
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-muted">
              {error instanceof Error
                ? error.message
                : "Đã xảy ra lỗi khi lấy thông tin cá nhân."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => void refetch()}
            className={`inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98] ${focusRing}`}
          >
            <RefreshCw size={16} aria-hidden="true" />
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  const { cvUrl, availabilityStatus, quote, workDirection } = profile;

  /* Độ hoàn thiện hồ sơ: tính từ các trường tùy chọn. */
  const completeness: CompletenessItem[] = [
    { label: "ảnh đại diện", done: hasText(profile.avatarUrl) },
    { label: "chức danh", done: hasText(profile.jobTitle) },
    { label: "số điện thoại", done: hasText(profile.phone) },
    { label: "địa điểm", done: hasText(profile.location) },
    { label: "định hướng công việc", done: hasText(workDirection) },
    { label: "trạng thái sẵn sàng", done: hasText(availabilityStatus) },
    { label: "CV", done: hasText(cvUrl) },
    { label: "mô tả ngắn", done: hasText(profile.shortDescription) },
    { label: "giới thiệu về tôi", done: hasText(profile.aboutMe) },
    { label: "châm ngôn", done: hasText(quote) }
  ];
  const missing: CompletenessItem[] = completeness.filter((c) => !c.done);
  const percent: number = Math.round(
    ((completeness.length - missing.length) / completeness.length) * 100
  );

  return (
    <div className={pageClass}>
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-3 lg:min-h-0">
        {/* Hero: cao theo nội dung, không co lại */}
        <section className="shrink-0 overflow-hidden rounded-3xl border border-line bg-gradient-to-r from-accent-soft via-surface to-surface">
          <div className="flex flex-col gap-4 p-4 sm:p-5 lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-center lg:gap-8">
            {/* Danh tính */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-surface bg-accent-soft text-xl font-bold text-accent shadow-sm">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={`Ảnh đại diện của ${profile.fullName}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(profile.fullName)
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="min-w-0">
                    <h1 className="break-words text-2xl font-bold tracking-tight">
                      {profile.fullName}
                    </h1>
                    <p className="mt-0.5 text-sm text-muted">
                      {profile.jobTitle || "Chưa cập nhật chức danh"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEditOpen(true)}
                    className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-[0.98] ${focusRing}`}
                  >
                    <Pencil size={15} aria-hidden="true" />
                    Chỉnh sửa hồ sơ
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {profile.location && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface2 px-3 py-1.5 text-xs font-medium text-muted">
                      <MapPin size={13} aria-hidden="true" />
                      {profile.location}
                    </span>
                  )}

                  {availabilityStatus && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                      />
                      {availabilityStatus}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Độ hoàn thiện hồ sơ */}
            <div className="rounded-2xl border border-line bg-surface2 p-3">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-semibold">Độ hoàn thiện hồ sơ</p>
                <p className="text-base font-bold tabular-nums text-accent">
                  {percent}%
                </p>
              </div>

              <div
                role="progressbar"
                aria-label="Độ hoàn thiện hồ sơ"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                className="mt-2 h-2 overflow-hidden rounded-full bg-line"
              >
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted">
                {missing.length === 0
                  ? "Hồ sơ đã đầy đủ thông tin."
                  : `Còn thiếu: ${missing.map((m) => m.label).join(", ")}.`}
              </p>
            </div>
          </div>
        </section>

        {/*
          Phần thân: chiếm toàn bộ chiều cao còn lại (flex-1). Từ lg trở lên
          hàng lưới được ép bằng đúng chiều cao đó, các thẻ tự co giãn để vừa
          khung; dưới lg thì xếp dọc như bình thường.
        */}
        <div className="grid flex-1 grid-cols-1 gap-3 lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_22rem] lg:grid-rows-[minmax(0,1fr)]">
          {/* Cột trái */}
          <div className="flex min-h-0 flex-col gap-3">
            <SectionCard
              className="flex-auto"
              bodyClassName="flex items-center"
              icon={<UserRound size={18} aria-hidden="true" />}
              title="Thông tin cá nhân"
              subtitle="Thông tin liên hệ và định danh"
            >
              <div className="grid w-full grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
                <InfoItem
                  icon={<UserRound size={18} aria-hidden="true" />}
                  label="Họ và tên"
                  value={profile.fullName}
                />
                <InfoItem
                  icon={<BriefcaseBusiness size={18} aria-hidden="true" />}
                  label="Chức danh"
                  value={profile.jobTitle}
                />
                <InfoItem
                  icon={<Mail size={18} aria-hidden="true" />}
                  label="Email"
                  value={profile.email}
                  href={profile.email ? `mailto:${profile.email}` : undefined}
                />
                <InfoItem
                  icon={<Phone size={18} aria-hidden="true" />}
                  label="Số điện thoại"
                  value={profile.phone}
                  href={profile.phone ? `tel:${profile.phone}` : undefined}
                />
                <InfoItem
                  icon={<MapPin size={18} aria-hidden="true" />}
                  label="Địa điểm"
                  value={profile.location}
                />
                <InfoItem
                  icon={<Globe size={18} aria-hidden="true" />}
                  label="Định hướng công việc"
                  value={workDirection}
                />
                <InfoItem
                  icon={<CalendarCheck size={18} aria-hidden="true" />}
                  label="Sẵn sàng làm việc"
                  value={availabilityStatus}
                />
              </div>
            </SectionCard>

            <SectionCard
              className="flex-auto"
              icon={<UserRound size={18} aria-hidden="true" />}
              title="Giới thiệu bản thân"
              subtitle="Nội dung giới thiệu trên portfolio"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-0">
                <div className="md:pr-6">
                  <p className="mb-1.5 text-sm font-semibold text-muted">
                    Mô tả ngắn
                  </p>
                  <p
                    className="line-clamp-3 whitespace-pre-wrap break-words text-base leading-7 text-ink"
                    title={profile.shortDescription ?? undefined}
                  >
                    {profile.shortDescription || "Chưa có mô tả ngắn."}
                  </p>
                </div>

                <div className="border-t border-line pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <p className="mb-1.5 text-sm font-semibold text-muted">
                    Về tôi
                  </p>
                  <p
                    className="line-clamp-4 whitespace-pre-wrap break-words text-sm leading-7 text-muted"
                    title={profile.aboutMe ?? undefined}
                  >
                    {profile.aboutMe || "Chưa có nội dung giới thiệu."}
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Cột phải */}
          <div className="flex min-h-0 flex-col gap-3">
            <SectionCard
              className="shrink-0"
              icon={<FileText size={18} aria-hidden="true" />}
              title="CV của tôi"
              subtitle="Hồ sơ ứng tuyển"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                  <FileText size={22} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">CV cá nhân</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {cvUrl ? "Đã liên kết CV" : "Chưa có CV"}
                  </p>
                </div>
              </div>

              {cvUrl ? (
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface2 px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent ${focusRing}`}
                >
                  Xem CV
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              ) : (
                <p className="mt-4 text-xs leading-5 text-muted">
                  Thêm liên kết CV để nhà tuyển dụng có thể xem hồ sơ của bạn.
                </p>
              )}
            </SectionCard>

            <SectionCard
              className="flex-auto"
              bodyClassName="flex items-center"
              icon={<Quote size={18} aria-hidden="true" />}
              title="Châm ngôn"
              subtitle="Câu nói truyền cảm hứng"
            >
              <blockquote
                className={`line-clamp-5 border-l-2 pl-4 text-sm leading-7 ${
                  hasText(quote)
                    ? "border-accent italic text-ink"
                    : "border-line text-muted"
                }`}
              >
                {hasText(quote)
                  ? quote
                  : "Bạn chưa cập nhật châm ngôn cá nhân."}
              </blockquote>
            </SectionCard>

            <div className="shrink-0 px-1 text-xs text-muted">
              <p>Profile ID</p>
              <p className="mt-1 break-all font-mono">{profile.id}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Chỉnh sửa hồ sơ"
        size="2xl"
      >
        <UpdateFormProfile
          onClose={() => {
            setIsEditOpen(false);
            setShowSuccess(true);
          }}
        />
      </Modal>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setShowSuccess(false)}
        >
          Cập nhật hồ sơ thành công!
        </Alert>
      </Snackbar>
    </div>
  );
}
