import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { useTheme } from "../../contexts/ThemeContext";

interface Breadcrumb {
  label: string;
  /** Bỏ trống cho mục hiện tại (không phải link) */
  to?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  /** Hiện link quay lại phía trên tiêu đề */
  backTo?: string;
  backLabel?: string;
  /** Vùng nút hành động bên phải (Add, Export...) */
  actions?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  backTo,
  backLabel = "Back",
  actions,
  className = ""
}: PageHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const mutedClass = isDark ? "text-slate-400" : "text-slate-500";
  const headingClass = isDark ? "text-white" : "text-slate-900";
  const focusRing =
    "rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500";

  return (
    <header
      className={`mb-6 flex flex-wrap items-end justify-between gap-4 ${className}`}
    >
      <div className="min-w-0">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav
            aria-label="Breadcrumb"
            className={`mb-2 flex flex-wrap items-center gap-1.5 text-sm ${mutedClass}`}
          >
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <React.Fragment key={`${item.label}-${index}`}>
                  {item.to && !isLast ? (
                    <Link
                      to={item.to}
                      className={`transition hover:text-indigo-500 ${focusRing}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      aria-current={isLast ? "page" : undefined}
                      className={isLast ? headingClass : undefined}
                    >
                      {item.label}
                    </span>
                  )}
                  {!isLast && <ChevronRight size={14} className="opacity-60" />}
                </React.Fragment>
              );
            })}
          </nav>
        ) : null}

        {backTo ? (
          <Link
            to={backTo}
            className={`mb-2 inline-flex items-center gap-1.5 text-sm transition hover:text-indigo-500 ${mutedClass} ${focusRing}`}
          >
            <ArrowLeft size={15} />
            {backLabel}
          </Link>
        ) : null}

        <h1
          className={`text-2xl font-bold tracking-tight sm:text-3xl ${headingClass}`}
        >
          {title}
        </h1>

        {description ? (
          <p className={`mt-1.5 max-w-2xl text-sm leading-6 ${mutedClass}`}>
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          {actions}
        </div>
      ) : null}
    </header>
  );
}
