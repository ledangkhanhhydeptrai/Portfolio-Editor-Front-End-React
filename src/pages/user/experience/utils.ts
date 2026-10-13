export const formatDate = (date: string | null): string => {
  if (date === null || date === "") {
    return "Hiện tại";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(parsedDate);
};
export const PAGE_HEIGHT = "lg:h-[calc(100dvh-80px)]";

/** Tính khoảng thời gian làm việc, vd: "2 năm 3 tháng". */
export const getDuration = (
  startDate: string | null,
  endDate: string | null,
  isCurrent: boolean
): string => {
  if (!startDate) return "—";

  const start = new Date(startDate);
  const end = isCurrent || !endDate ? new Date() : new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "—";

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  months = Math.max(0, months);

  const years = Math.floor(months / 12);
  const rest = months % 12;

  if (years === 0 && rest === 0) return "Dưới 1 tháng";

  return [years > 0 ? `${years} năm` : "", rest > 0 ? `${rest} tháng` : ""]
    .filter(Boolean)
    .join(" ");
};
