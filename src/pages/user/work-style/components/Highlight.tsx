import React from "react";

interface HighlightProps {
  text: string;
  keyword: string;
}

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Tô sáng phần văn bản khớp với từ khóa tìm kiếm. */
const Highlight: React.FC<HighlightProps> = ({ text, keyword }) => {
  const key = keyword.trim();
  if (!key) return <>{text}</>;

  const parts = text.split(new RegExp(`(${escapeRegExp(key)})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === key.toLowerCase() ? (
          <mark key={i} className="rounded bg-[#7F96F5]/25 px-0.5 text-inherit">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export default Highlight;
