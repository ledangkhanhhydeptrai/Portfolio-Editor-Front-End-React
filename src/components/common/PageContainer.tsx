import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  /** narrow: form / trang đọc – default: trang quản trị – wide: bảng dữ liệu – full: không giới hạn */
  size?: "narrow" | "default" | "wide" | "full";
  className?: string;
}

const MAX_WIDTH = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-[1500px]",
  full: "max-w-none"
} as const;

export default function PageContainer({
  children,
  size = "default",
  className = ""
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full p-4 sm:p-6 lg:p-8 ${MAX_WIDTH[size]} ${className}`}
    >
      {children}
    </div>
  );
}
