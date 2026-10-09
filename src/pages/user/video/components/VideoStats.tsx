import React from "react";
import { formatTotalDuration } from "../../../../utils/formatDate";
import { VideoProps } from "../../../../services/video/VideoTypes";

interface VideoStatsProps {
  isDark: boolean;
  videos: VideoProps[];
}

const VideoStats: React.FC<VideoStatsProps> = ({ isDark, videos }) => {
  const hasVideos = videos.length > 0;
  const categoryCount = new Set(videos.map((video) => video.category)).size;
  const latestYear = hasVideos
    ? Math.max(...videos.map((video) => video.year))
    : null;

  const stats = [
    {
      label: "Total videos",
      value: videos.length.toString(),
      hint: "In your library"
    },
    {
      label: "Categories",
      value: categoryCount.toString(),
      hint: "Different types of video"
    },
    {
      label: "Latest year",
      value: latestYear ? latestYear.toString() : "–",
      hint: "Most recent work"
    },
    {
      label: "Total duration",
      value: hasVideos ? formatTotalDuration(videos) : "–",
      hint: "Across all videos"
    }
  ];

  return (
    <dl
      className={`grid shrink-0 grid-cols-2 gap-px overflow-hidden rounded-xl border lg:grid-cols-4 ${
        isDark ? "border-black bg-black" : "border-slate-200 bg-slate-200"
      }`}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${isDark ? "bg-slate-900" : "bg-white"} px-5 py-4`}
        >
          <dt
            className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            {stat.label}
          </dt>

          <dd
            className={`mt-1 text-2xl font-semibold tabular-nums ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {stat.value}
          </dd>

          <p
            className={`mt-0.5 text-xs ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {stat.hint}
          </p>
        </div>
      ))}
    </dl>
  );
};

export default VideoStats;