import React, { useId, useState } from "react";

export interface TooltipProps {
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  children: React.ReactElement<any>;
}

const sides = {
  top: "bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2",
  bottom: "top-[calc(100%+8px)] left-1/2 -translate-x-1/2",
  left: "right-[calc(100%+8px)] top-1/2 -translate-y-1/2",
  right: "left-[calc(100%+8px)] top-1/2 -translate-y-1/2"
};

export default function Tooltip({
  content,
  side = "top",
  children
}: TooltipProps) {
  const [show, setShow] = useState(false);
  const id = useId();
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      onKeyDown={(e) => e.key === "Escape" && setShow(false)}
    >
      {React.cloneElement(children, {
        "aria-describedby": show ? id : undefined
      })}
      {show && (
        <span
          id={id}
          role="tooltip"
          className={`pointer-events-none absolute z-[60] w-max max-w-60 rounded-lg bg-ink px-2.5 py-[7px] font-body text-[0.8125rem] font-medium leading-snug text-page motion-safe:animate-fade ${sides[side]}`}
        >
          {content}
        </span>
      )}
    </span>
  );
}
