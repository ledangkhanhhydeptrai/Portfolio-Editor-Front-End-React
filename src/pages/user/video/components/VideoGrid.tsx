import React from "react";
import Checkbox from "./Checkbox";
import Thumbnail from "./Thumbnail";
import VideoActions from "./VideoActions";
import { formatCategory } from "../../../../utils/formatDate";
import { VideoEnum, VideoProps } from "../../../../services/video/VideoTypes";

interface VideoGridProps {
  isDark: boolean;
  videos: VideoProps[];
  selectedIds: string[];
  onToggleSelected: (id: string) => void;
  onView: (videoUrl: string) => void;
  onEdit: (id: string) => void;
  onDelete: (ids: string[]) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({
  isDark,
  videos,
  selectedIds,
  onToggleSelected,
  onView,
  onEdit,
  onDelete
}) => (
  <ul className="grid min-h-0 flex-1 content-start gap-4 overflow-y-auto p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
    {videos.map((video) => {
      const isSelected = selectedIds.includes(video.id);

      return (
        <li
          key={video.id}
          className={`overflow-hidden rounded-lg border transition-colors ${
            isSelected
              ? "border-indigo-400 ring-1 ring-indigo-400"
              : isDark
                ? "border-black"
                : "border-slate-200"
          } ${isDark ? "bg-slate-900" : "bg-white"}`}
        >
          <div className="relative">
            <Thumbnail video={video} className="aspect-video w-full" />
            <div
              className={`absolute left-2 top-2 rounded p-1 ${
                isDark ? "bg-slate-900/90" : "bg-white/90"
              }`}
            >
              <Checkbox
                checked={isSelected}
                onChange={() => onToggleSelected(video.id)}
                label={`Select ${video.title}`}
              />
            </div>
          </div>

          <div className="p-4">
            <p
              className={`line-clamp-2 font-semibold ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {video.title}
            </p>

            <p
              className={`mt-1 line-clamp-1 text-xs ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {video.description}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <p
                className={`text-xs ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                <span
                  className={`font-medium ${
                    isDark ? "text-indigo-300" : "text-indigo-700"
                  }`}
                >
                  {formatCategory(video.category as VideoEnum)}
                </span>{" "}
                • {video.year} • #{video.displayOrder}
              </p>

              <div className="-mr-2 flex items-center">
                <VideoActions
                  video={video}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={(id) => onDelete([id])}
                />
              </div>
            </div>
          </div>
        </li>
      );
    })}
  </ul>
);

export default VideoGrid;