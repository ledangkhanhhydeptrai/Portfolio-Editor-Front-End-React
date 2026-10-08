import React from "react";

const WorkBento = (): React.ReactElement => (
  <div className="grid h-64 grid-cols-6 grid-rows-2 gap-3 sm:h-80 lg:h-auto lg:min-h-0 lg:flex-1">
    <figure
      className="lp-rise relative col-span-4 row-span-2 m-0 overflow-hidden rounded-3xl border border-white/10 bg-[#5b6cff]"
      style={{ animationDelay: "300ms" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.35),transparent_55%)]" />

      <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-black/25 px-3.5 py-2.5 backdrop-blur-md">
        <p className="truncate text-sm font-semibold text-white">
          Creative Project
        </p>

        <p className="truncate text-xs text-white/70">Featured work</p>
      </figcaption>
    </figure>

    <figure
      className="lp-rise relative col-span-2 m-0 overflow-hidden rounded-3xl border border-white/10 bg-[#a855f7]"
      style={{ animationDelay: "440ms" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.3),transparent_55%)]" />

      <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-black/25 px-3 py-2 backdrop-blur-md">
        <p className="truncate text-xs font-semibold text-white">Digital</p>
      </figcaption>
    </figure>

    <figure
      className="lp-rise relative col-span-2 m-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0ea5c6]"
      style={{ animationDelay: "580ms" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.3),transparent_55%)]" />

      <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-black/25 px-3 py-2 backdrop-blur-md">
        <p className="truncate text-xs font-semibold text-white">Development</p>
      </figcaption>
    </figure>
  </div>
);

export default WorkBento;
