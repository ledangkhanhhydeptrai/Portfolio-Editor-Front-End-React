import React from "react";

const LoadingState: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <div
    role="status"
    aria-label="Loading videos"
    className="flex flex-1 flex-col gap-3 p-5"
  >
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="flex animate-pulse items-center gap-3">
        <div
          className={`h-14 w-24 rounded-md ${
            isDark ? "bg-slate-800" : "bg-slate-200"
          }`}
        />
        <div className="flex-1 space-y-2">
          <div
            className={`h-3.5 w-1/3 rounded ${
              isDark ? "bg-slate-800" : "bg-slate-200"
            }`}
          />
          <div
            className={`h-3 w-1/2 rounded ${
              isDark ? "bg-slate-800" : "bg-slate-100"
            }`}
          />
        </div>
      </div>
    ))}
  </div>
);

export default LoadingState;
