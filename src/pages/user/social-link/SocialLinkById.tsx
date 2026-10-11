import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  Link2,
  RefreshCw
} from "lucide-react";

import { UseSocialLinkById } from "../../../hooks/useSocialLink";
import { useTheme } from "../../../contexts/ThemeContext";
import {
  SocialLinkIcon,
  getHostname,
  useCopyToClipboard,
  focusRing
} from "./components/SocialLinkShared";

const LIST_PATH = "/social-links";

export default function SocialLinkById() {
  const params = useParams();
  const id = params.id || "";

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { data, isLoading, isError, refetch } = UseSocialLinkById(id);
  const { copiedId, copy } = useCopyToClipboard();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  const socialLink = data?.data;

  const pageClass = `flex min-h-[calc(100vh-5.25rem)] flex-col p-1 transition-colors duration-200 ${
    isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"
  }`;
  const panel = isDark
    ? "border-white/[0.07] bg-zinc-900/60"
    : "border-zinc-200/80 bg-white shadow-sm";
  const divider = isDark ? "divide-white/[0.06]" : "divide-zinc-100";
  const borderColor = isDark ? "border-white/[0.07]" : "border-zinc-100";

  const secondaryBtn = `inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition ${focusRing} ${
    isDark
      ? "bg-white/[0.06] text-zinc-200 hover:bg-white/10"
      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
  }`;
  const primaryBtn = `inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white transition hover:bg-indigo-500 ${focusRing}`;

  const backLink = (
    <Link
      to={LIST_PATH}
      className={`inline-flex items-center gap-1.5 rounded-lg text-sm text-zinc-500 transition hover:text-indigo-500 ${focusRing}`}
    >
      <ArrowLeft size={15} />
      Danh sách liên kết
    </Link>
  );

  /* ------------------------------ Loading ------------------------------ */
  if (isLoading) {
    const bar = isDark ? "bg-white/[0.07]" : "bg-zinc-200/80";
    return (
      <div
        className={pageClass}
        aria-busy="true"
        aria-label="Đang tải thông tin liên kết"
      >
        <div className="mx-auto w-full max-w-5xl motion-safe:animate-pulse">
          <div className={`mb-6 h-4 w-40 rounded ${bar}`} />
          <div className={`rounded-2xl border p-6 ${panel}`}>
            <div className="flex items-center gap-5">
              <div className={`h-20 w-20 rounded-2xl ${bar}`} />
              <div className="flex-1 space-y-3">
                <div className={`h-6 w-48 rounded ${bar}`} />
                <div className={`h-3.5 w-32 rounded ${bar}`} />
              </div>
            </div>
          </div>
          <div className={`mt-6 h-72 rounded-2xl border ${panel}`} />
        </div>
      </div>
    );
  }

  /* ------------------------------- Error ------------------------------- */
  if (isError || !socialLink) {
    return (
      <div className={pageClass}>
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-6">{backLink}</div>
          <div
            className={`flex flex-col items-center rounded-2xl border px-6 py-16 text-center ${panel}`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 ring-1 ring-inset ring-red-500/20">
              <Link2 size={24} />
            </div>
            <h1 className="mt-5 text-lg font-semibold">
              Không tìm thấy liên kết
            </h1>
            <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-zinc-500">
              Liên kết có thể đã bị xóa hoặc đã có lỗi khi tải dữ liệu. Thử tải
              lại hoặc quay về danh sách.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => void refetch()}
                className={primaryBtn}
              >
                <RefreshCw size={15} />
                Thử lại
              </button>
              <Link to={LIST_PATH} className={secondaryBtn}>
                Về danh sách
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------ Content ------------------------------ */
  const platform = socialLink.platform || "Chưa có tên nền tảng";
  const url = socialLink.url || "";
  const iconUrl = socialLink.iconUrl || "";
  const displayOrder = socialLink.displayOrder;
  const hasOrder = displayOrder !== undefined && displayOrder !== null;

  const copyBtn = (key: string, value: string, label: string) => {
    const copied = copiedId === key;
    return (
      <button
        type="button"
        onClick={() => void copy(key, value)}
        aria-label={copied ? "Đã sao chép" : `Sao chép ${label}`}
        title={copied ? "Đã sao chép" : `Sao chép ${label}`}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${focusRing} ${
          isDark
            ? "text-zinc-400 hover:bg-white/10 hover:text-white"
            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
        }`}
      >
        {copied ? (
          <Check size={15} className="text-emerald-500" />
        ) : (
          <Copy size={15} />
        )}
      </button>
    );
  };

  const row = (
    label: string,
    content: React.ReactNode,
    action?: React.ReactNode
  ) => (
    <div className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-4 sm:px-6">
      <dt className="text-sm text-zinc-500">{label}</dt>
      <dd className="min-w-0 text-sm">{content}</dd>
      {action && <div className="hidden sm:block">{action}</div>}
    </div>
  );

  const mono = "break-all font-mono text-xs leading-relaxed";

  return (
    <div className={pageClass}>
      <div className="mx-auto flex w-full flex-1 flex-col gap-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm"
        >
          {backLink}
          <ChevronRight size={14} className="text-zinc-400" />
          <span className="truncate font-medium">{platform}</span>
        </nav>

        {/* Hero */}
        <header
          className={`flex flex-col gap-5 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 ${panel}`}
        >
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <SocialLinkIcon
              src={iconUrl}
              alt={`${platform} icon`}
              isDark={isDark}
              className="h-16 w-16 sm:h-20 sm:w-20"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="break-words text-xl font-semibold tracking-tight sm:text-2xl">
                  {platform}
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Đang hiển thị
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-zinc-500">
                {url ? getHostname(url) : "Chưa có đường dẫn"}
              </p>
            </div>
          </div>

          {url && (
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => void copy("hero-url", url)}
                className={secondaryBtn}
              >
                {copiedId === "hero-url" ? (
                  <>
                    <Check size={15} className="text-emerald-500" />
                    Đã sao chép
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    Sao chép
                  </>
                )}
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryBtn}
              >
                Mở liên kết
                <ArrowUpRight size={16} />
              </a>
            </div>
          )}
        </header>

        {/* Thông tin */}
        <section
          className={`flex flex-1 flex-col overflow-hidden rounded-2xl border ${panel}`}
        >
          <div
            className={`flex items-center justify-between border-b px-5 py-4 sm:px-6 ${borderColor}`}
          >
            <div>
              <h2 className="text-sm font-semibold">Thông tin liên kết</h2>
              <p className="text-xs text-zinc-500">
                Dữ liệu được lấy từ hệ thống
              </p>
            </div>
            <button
              type="button"
              onClick={() => void handleRefresh()}
              disabled={refreshing}
              aria-label="Làm mới dữ liệu"
              title="Làm mới"
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition disabled:opacity-50 ${focusRing} ${
                isDark
                  ? "hover:bg-white/10 hover:text-white"
                  : "hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              <RefreshCw
                size={15}
                className={
                  refreshing ? "text-indigo-500 motion-safe:animate-spin" : ""
                }
              />
            </button>
          </div>

          <dl className={`divide-y ${divider}`}>
            {row("Nền tảng", <span className="font-medium">{platform}</span>)}

            {row(
              "Đường dẫn",
              url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${mono} text-indigo-500 transition hover:text-indigo-400 hover:underline`}
                >
                  {url}
                </a>
              ) : (
                <span className="text-zinc-500">Chưa có đường dẫn.</span>
              ),
              url ? copyBtn("url", url, "đường dẫn") : undefined
            )}

            {row(
              "Thứ tự hiển thị",
              hasOrder ? (
                <span
                  className={`inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-xs font-medium tabular-nums ${
                    isDark
                      ? "bg-white/[0.06] text-zinc-300"
                      : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {displayOrder}
                </span>
              ) : (
                <span className="text-zinc-500">Chưa thiết lập</span>
              )
            )}

            {row(
              "Biểu tượng",
              iconUrl ? (
                <a
                  href={iconUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${mono} text-zinc-500 transition hover:text-indigo-500 hover:underline`}
                >
                  {iconUrl}
                </a>
              ) : (
                <span className="text-zinc-500">Chưa có biểu tượng.</span>
              ),
              iconUrl
                ? copyBtn("icon", iconUrl, "đường dẫn biểu tượng")
                : undefined
            )}

            {row(
              "ID",
              <span className={`${mono} text-zinc-500`}>{socialLink.id}</span>,
              copyBtn("id", String(socialLink.id), "ID")
            )}
          </dl>

          {/* Chân thẻ: luôn nằm sát đáy */}
          <div
            className={`mt-auto flex items-center border-t px-5 py-4 sm:px-6 ${borderColor}`}
          >
            <Link to={LIST_PATH} className={secondaryBtn}>
              <ArrowLeft size={15} />
              Quay lại danh sách
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
