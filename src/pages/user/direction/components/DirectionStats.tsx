import React from "react";

interface DirectionStatsProps {
  directions: number;
  skills: number;
  categories: number;
}

interface StatItemProps {
  icon: React.ReactNode;
  tint: string;
  label: string;
  value: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, tint, label, value }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-4 sm:px-6">
      <div
        className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:flex ${tint}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-2xl font-semibold leading-none tracking-tight text-gray-50">
          {value}
        </p>

        <p className="mt-1.5 truncate text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
};

const DirectionStats: React.FC<DirectionStatsProps> = ({
  directions,
  skills,
  categories
}) => {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#0E1015] grid grid-cols-3 divide-x divide-white/[0.07]">
      <StatItem
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-teal-300"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m16.2 7.8-4.2 8.4-4.2-4.2 8.4-4.2Z" />
          </svg>
        }
        tint="bg-teal-400/10"
        label="Định hướng"
        value={directions}
      />

      <StatItem
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-violet-300"
          >
            <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
            <path d="m12 12 8-4.5M12 12v9M12 12 4 7.5" />
          </svg>
        }
        tint="bg-violet-400/10"
        label="Kỹ năng"
        value={skills}
      />

      <StatItem
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-300"
          >
            <path d="m8 3-5 5 5 5" />
            <path d="M3 8h13a5 5 0 0 1 0 10h-1" />
          </svg>
        }
        tint="bg-emerald-400/10"
        label="Nhóm kỹ năng"
        value={categories}
      />
    </section>
  );
};

export default DirectionStats;
