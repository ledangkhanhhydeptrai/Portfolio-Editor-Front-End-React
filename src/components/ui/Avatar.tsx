import React, { useEffect, useState } from "react";

export interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
  status?: "online" | "offline" | "busy";
  className?: string;
}

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

const statusColor = {
  online: "bg-success",
  offline: "bg-muted",
  busy: "bg-danger",
};

export default function Avatar({
  name,
  src,
  size = 40,
  status,
  className = "",
}: AvatarProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <span
      role="img"
      aria-label={name}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
      }}
      className={`relative inline-grid shrink-0 select-none place-items-center overflow-hidden rounded-full bg-accent-soft font-display font-bold text-accent ${className}`}
    >
      {src && !failed ? (
        <img
          src={src}
          alt=""
          onError={() => setFailed(true)}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        getInitials(name)
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 h-[28%] w-[28%] rounded-full border-2 border-surface ${statusColor[status]}`}
        />
      )}
    </span>
  );
}