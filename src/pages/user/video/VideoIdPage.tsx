import React, { useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  ExternalLink,
  FileVideo,
  ImageOff,
  Layers,
  ListOrdered,
  TriangleAlert
} from "lucide-react";

import { useTheme } from "../../../contexts/ThemeContext";
import { useVideoById } from "../../../hooks/useVideo";

/*
 * Cho trang tự lấp đầy phần còn lại của khung nhìn (từ vị trí bắt đầu của
 * trang đến đáy cửa sổ) nên không phụ thuộc vào chiều cao header.
 * Chỉ áp dụng từ breakpoint lg (>= 1024px); nhỏ hơn thì cuộn bình thường.
 * Nếu layout cha có padding dưới, tăng BOTTOM_GAP lên số px tương ứng.
 */
const BOTTOM_GAP = 0;

function useFitHeight() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  const measure = () => {
    const el = ref.current;
    if (!el || !window.matchMedia("(min-width: 1024px)").matches) {
      setHeight(null);
      return;
    }
    const top = el.getBoundingClientRect().top;
    setHeight(Math.max(window.innerHeight - top - BOTTOM_GAP, 480));
  };

  // Đo lại sau mỗi lần render (loading -> loaded đổi phần tử gốc)
  useLayoutEffect(measure);

  useLayoutEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return {
    ref,
    style: height ? ({ height } as React.CSSProperties) : undefined
  };
}

/* ---------- Small building blocks ---------- */

function CopyButton({
  value,
  label,
  isDark
}: {
  value: string;
  label: string;
  isDark: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : `Copy ${label}`}
      title={copied ? "Copied" : `Copy ${label}`}
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        copied
          ? "bg-emerald-500/15 text-emerald-500"
          : isDark
            ? "text-slate-400 hover:bg-white/10 hover:text-white"
            : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
      }`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

function Chip({
  icon,
  children,
  isDark
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        isDark
          ? "bg-white/[0.06] text-slate-300 ring-1 ring-inset ring-white/10"
          : "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200"
      }`}
    >
      {icon}
      {children}
    </span>
  );
}

function DetailRow({
  icon,
  label,
  children,
  mutedClass
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  mutedClass: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <dt
        className={`inline-flex shrink-0 items-center gap-2 text-sm ${mutedClass}`}
      >
        {icon}
        {label}
      </dt>
      <dd className="flex min-w-0 items-center justify-end gap-1">
        {children}
      </dd>
    </div>
  );
}

/* ---------- Page ---------- */

export default function VideoIdPage() {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const isDark = theme === "dark";

  const { data, isLoading, isError } = useVideoById(id || "");
  const fit = useFitHeight();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  /*
   * Supports the current hook type:
   * VideoProps | ApiResponse<VideoProps | null>
   *
   * If the hook is standardized to ApiResponse only, this can become:
   * const video = data ? data.data : null;
   */
  const video = data ? ("data" in data ? data.data : data) : null;

  /* ---------- Theme tokens ---------- */
  const pageBg = isDark ? "bg-slate-950" : "bg-slate-50";
  const panel = isDark
    ? "border-white/10 bg-slate-900/60"
    : "border-slate-200 bg-white";
  const divider = isDark ? "divide-white/10" : "divide-slate-100";
  const headingClass = isDark ? "text-white" : "text-slate-900";
  const bodyClass = isDark ? "text-slate-300" : "text-slate-600";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-500";
  const focusRing =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500";
  const secondaryBtn = isDark
    ? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50";

  /* ---------- Loading ---------- */
  if (isLoading) {
    return (
      <div ref={fit.ref} style={fit.style} className={`p-4 lg:p-5 ${pageBg}`}>
        <div className="mx-auto grid h-full max-w-[1500px] animate-pulse grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:grid-rows-[minmax(0,1fr)]">
          <div className="flex min-h-0 flex-col gap-3">
            <div
              className={`h-4 w-48 rounded ${
                isDark ? "bg-white/10" : "bg-slate-200"
              }`}
            />
            <div
              className={`min-h-[240px] flex-1 rounded-2xl ${
                isDark ? "bg-white/10" : "bg-slate-200"
              }`}
            />
            <div
              className={`h-7 w-2/3 rounded ${
                isDark ? "bg-white/10" : "bg-slate-200"
              }`}
            />
          </div>
          <div
            className={`h-72 rounded-2xl ${
              isDark ? "bg-white/5" : "bg-slate-200/70"
            }`}
          />
        </div>
      </div>
    );
  }

  /* ---------- Error / not found ---------- */
  if (isError || !video) {
    return (
      <div
        ref={fit.ref}
        style={fit.style}
        className={`flex items-center justify-center p-6 ${pageBg}`}
      >
        <div
          className={`w-full max-w-md rounded-2xl border p-8 text-center shadow-sm ${panel}`}
        >
          <div
            className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${
              isDark
                ? "bg-rose-500/10 text-rose-400"
                : "bg-rose-50 text-rose-500"
            }`}
          >
            <TriangleAlert size={26} />
          </div>
          <h1 className={`text-xl font-semibold ${headingClass}`}>
            Unable to load video
          </h1>
          <p className={`mt-2 text-sm leading-6 ${mutedClass}`}>
            The video could not be found or the request failed. Check the link
            and try again.
          </p>
          <Link
            to="/video"
            className={`mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 ${focusRing}`}
          >
            <ArrowLeft size={16} />
            Back to videos
          </Link>
        </div>
      </div>
    );
  }

  /* ---------- Derived values ---------- */
  const title = video.title || "Untitled video";
  const description = video.description || "No description available.";
  const videoUrl = video.videoUrl || "";
  const thumbnailUrl = video.thumbnailUrl || "";
  const duration = video.duration || "N/A";
  const year = video.year;
  const displayOrder = video.displayOrder;
  const category = "category" in video ? video.category : undefined;
  const createdAt = "createdAt" in video ? video.createdAt : undefined;

  const hasYear = year !== undefined && year !== null;
  const hasOrder = displayOrder !== undefined && displayOrder !== null;

  return (
    <div ref={fit.ref} style={fit.style} className={`p-4 lg:p-5 ${pageBg}`}>
      <div className="mx-auto grid h-full max-w-[1500px] grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:grid-rows-[minmax(0,1fr)]">
        {/* ---------- Main column ---------- */}
        <main className="flex min-h-0 min-w-0 flex-col gap-3">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className={`flex shrink-0 items-center gap-1.5 text-sm ${mutedClass}`}
          >
            <Link
              to="/video"
              className={`inline-flex items-center gap-1.5 rounded-md transition hover:text-indigo-500 ${focusRing}`}
            >
              <ArrowLeft size={15} />
              Videos
            </Link>
            <ChevronRight size={14} className="opacity-60" />
            <span className={`min-w-0 truncate ${headingClass}`}>{title}</span>
          </nav>

          {/* Player – chiếm toàn bộ chiều cao còn lại */}
          <div
            className={`relative min-h-[220px] flex-1 overflow-hidden rounded-2xl bg-black shadow-xl ring-1 max-lg:aspect-video max-lg:flex-none ${
              isDark
                ? "shadow-black/40 ring-white/10"
                : "shadow-slate-300/60 ring-slate-900/10"
            }`}
          >
            {videoUrl ? (
              <video
                src={videoUrl}
                poster={thumbnailUrl || undefined}
                controls
                preload="metadata"
                playsInline
                className="absolute inset-0 h-full w-full object-contain"
              >
                Your browser does not support video playback.
              </video>
            ) : thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="absolute inset-0 h-full w-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-500">
                <FileVideo size={44} strokeWidth={1.5} />
                <p className="text-sm">No video URL available</p>
              </div>
            )}
          </div>

          {/* Title + chips */}
          <header className="shrink-0">
            <h1
              className={`truncate text-xl font-bold tracking-tight sm:text-2xl ${headingClass}`}
              title={title}
            >
              {title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Chip isDark={isDark} icon={<Clock3 size={13} />}>
                {duration}
              </Chip>
              {hasYear && (
                <Chip isDark={isDark} icon={<CalendarDays size={13} />}>
                  {String(year)}
                </Chip>
              )}
              {category ? (
                <Chip isDark={isDark} icon={<Layers size={13} />}>
                  {String(category)}
                </Chip>
              ) : null}
              {createdAt ? (
                <span className={`ml-1 text-xs ${mutedClass}`}>
                  Added {String(createdAt)}
                </span>
              ) : null}
            </div>
          </header>

          {/* Description – cao tối đa 6rem, dài hơn thì cuộn trong khung */}
          <section
            className={`max-h-24 shrink-0 overflow-y-auto rounded-2xl border px-4 py-3 ${panel}`}
            aria-label="Description"
          >
            <p className={`whitespace-pre-wrap text-sm leading-6 ${bodyClass}`}>
              {description}
            </p>
          </section>
        </main>

        {/* ---------- Sidebar ---------- */}
        <aside className="flex min-h-0 flex-col gap-3 lg:overflow-y-auto lg:pr-0.5">
          {/* Status + actions */}
          <section className={`shrink-0 rounded-2xl border p-4 ${panel}`}>
            <div className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  videoUrl
                    ? isDark
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-emerald-50 text-emerald-600"
                    : isDark
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-amber-50 text-amber-600"
                }`}
              >
                <FileVideo size={18} />
              </span>
              <div className="min-w-0">
                <p className={`text-sm font-semibold ${headingClass}`}>
                  {videoUrl ? "Ready to play" : "Video URL missing"}
                </p>
                <p className={`truncate text-xs ${mutedClass}`}>
                  {videoUrl
                    ? "The video is available for playback."
                    : "Check the video URL returned by the API."}
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {videoUrl ? (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-600/30 transition hover:bg-indigo-500 ${focusRing}`}
                >
                  <ExternalLink size={15} />
                  Open
                </a>
              ) : null}
              <button
                type="button"
                onClick={handleGoBack}
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition ${secondaryBtn} ${focusRing} ${
                  videoUrl ? "" : "col-span-2"
                }`}
              >
                <ArrowLeft size={15} />
                Back
              </button>
            </div>
          </section>

          {/* Details */}
          <section className={`shrink-0 rounded-2xl border px-4 py-3 ${panel}`}>
            <h2 className={`pb-1 text-sm font-semibold ${headingClass}`}>
              Details
            </h2>

            <dl className={`divide-y ${divider}`}>
              <DetailRow
                icon={<Clock3 size={15} />}
                label="Duration"
                mutedClass={mutedClass}
              >
                <span className={`text-sm font-medium ${headingClass}`}>
                  {duration}
                </span>
              </DetailRow>

              {category ? (
                <DetailRow
                  icon={<Layers size={15} />}
                  label="Category"
                  mutedClass={mutedClass}
                >
                  <span
                    className={`truncate text-sm font-medium ${headingClass}`}
                  >
                    {String(category)}
                  </span>
                </DetailRow>
              ) : null}

              {hasYear ? (
                <DetailRow
                  icon={<CalendarDays size={15} />}
                  label="Year"
                  mutedClass={mutedClass}
                >
                  <span className={`text-sm font-medium ${headingClass}`}>
                    {String(year)}
                  </span>
                </DetailRow>
              ) : null}

              {hasOrder ? (
                <DetailRow
                  icon={<ListOrdered size={15} />}
                  label="Display order"
                  mutedClass={mutedClass}
                >
                  <span className={`text-sm font-medium ${headingClass}`}>
                    {String(displayOrder)}
                  </span>
                </DetailRow>
              ) : null}
            </dl>
          </section>

          {/* Files */}
          <section className={`shrink-0 rounded-2xl border p-4 ${panel}`}>
            <h2 className={`mb-3 text-sm font-semibold ${headingClass}`}>
              Files
            </h2>

            <div className="flex gap-3">
              <div
                className={`h-16 w-28 shrink-0 overflow-hidden rounded-lg ring-1 ring-inset ${
                  isDark
                    ? "bg-slate-800/60 ring-white/10"
                    : "bg-slate-100 ring-slate-200"
                }`}
              >
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt={`Thumbnail of ${title}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={`flex h-full flex-col items-center justify-center gap-1 ${mutedClass}`}
                  >
                    <ImageOff size={18} strokeWidth={1.5} />
                    <p className="text-[10px]">No thumbnail</p>
                  </div>
                )}
              </div>

              <p className={`self-center text-xs leading-5 ${mutedClass}`}>
                Thumbnail used as the player poster.
              </p>
            </div>

            <div className="mt-3 space-y-2.5">
              <div>
                <p className={`mb-0.5 text-xs font-medium ${mutedClass}`}>
                  Video URL
                </p>
                {videoUrl ? (
                  <div className="flex items-center gap-1">
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      title={videoUrl}
                      className="min-w-0 flex-1 truncate text-xs text-indigo-500 hover:underline"
                    >
                      {videoUrl}
                    </a>
                    <CopyButton
                      value={videoUrl}
                      label="video URL"
                      isDark={isDark}
                    />
                  </div>
                ) : (
                  <p className={`text-xs ${mutedClass}`}>
                    No video URL available
                  </p>
                )}
              </div>

              {thumbnailUrl ? (
                <div>
                  <p className={`mb-0.5 text-xs font-medium ${mutedClass}`}>
                    Thumbnail URL
                  </p>
                  <div className="flex items-center gap-1">
                    <p
                      title={thumbnailUrl}
                      className={`min-w-0 flex-1 truncate text-xs ${bodyClass}`}
                    >
                      {thumbnailUrl}
                    </p>
                    <CopyButton
                      value={thumbnailUrl}
                      label="thumbnail URL"
                      isDark={isDark}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
