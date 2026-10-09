import React from "react";
import type { VideoStatus } from "../types";

const StatusBadge: React.FC<{ status: VideoStatus }> = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 text-xs font-medium ${
      status === "Published" ? "text-emerald-700" : "text-amber-700"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${
        status === "Published" ? "bg-emerald-500" : "bg-amber-500"
      }`}
    />
    {status}
  </span>
);

export default StatusBadge;
