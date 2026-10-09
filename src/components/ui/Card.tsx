import React from "react";

export interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  /** Truyền onClick để thẻ có hiệu ứng hover và bấm được */
  onClick?: () => void;
  className?: string;
}

export default function Card({
  title,
  description,
  image,
  imageAlt = "",
  footer,
  children,
  onClick,
  className = ""
}: CardProps) {
  const interactive = Boolean(onClick);
  return (
    <article
      onClick={onClick}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "button" : undefined}
      onKeyDown={
        interactive
          ? (e) =>
              (e.key === "Enter" || e.key === " ") &&
              (e.preventDefault(), onClick?.())
          : undefined
      }
      className={`flex flex-col gap-3.5 rounded-[20px] border border-line bg-surface p-6 text-left font-body text-ink ${
        interactive
          ? "cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          : ""
      } ${className}`}
    >
      {image && (
        <div className="-mx-6 -mt-6 aspect-video overflow-hidden rounded-t-[20px] bg-surface2">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="block h-full w-full object-cover"
          />
        </div>
      )}
      {title && (
        <h3 className="m-0 font-display text-xl font-bold leading-tight tracking-tight">
          {title}
        </h3>
      )}
      {description && (
        <p className="m-0 max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted">
          {description}
        </p>
      )}
      {children}
      {footer && (
        <div className="mt-auto flex flex-wrap items-center gap-2">
          {footer}
        </div>
      )}
    </article>
  );
}
