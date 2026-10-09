import React from "react";
import Checkbox from "./Checkbox";
import Thumbnail from "./Thumbnail";
import VideoActions from "./VideoActions";
import { VideoEnum, VideoProps } from "../../../../services/video/VideoTypes";
import { formatCategory } from "../../../../utils/formatDate";

interface VideoTableProps {
  isDark: boolean;
  videos: VideoProps[];
  selectedIds: string[];
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: () => void;
  onToggleSelected: (id: string) => void;
  onView: (videoUrl: string) => void;
  onEdit: (id: string) => void;
  onDelete: (ids: string[]) => void;
}

const VideoTable: React.FC<VideoTableProps> = ({
  isDark,
  videos,
  selectedIds,
  allSelected,
  someSelected,
  onToggleAll,
  onToggleSelected,
  onView,
  onEdit,
  onDelete
}) => (
  <div className="min-h-0 flex-1 overflow-auto">
    <table className="w-full min-w-[720px] text-left text-sm">
      <thead
        className={`sticky top-0 z-10 border-b text-xs font-medium ${
          isDark
            ? "border-black bg-slate-800 text-slate-300"
            : "border-slate-200 bg-slate-50 text-slate-600"
        }`}
      >
        <tr>
          <th className="w-12 py-3 pl-5">
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={onToggleAll}
              label="Select all videos on this page"
            />
          </th>
          <th className="px-3 py-3 font-medium">Video</th>
          <th className="px-3 py-3 font-medium">Category</th>
          <th className="px-3 py-3 font-medium">Year</th>
          <th className="px-3 py-3 text-right font-medium">Order</th>
          <th className="px-5 py-3 text-right font-medium">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>

      <tbody
        className={`divide-y ${isDark ? "divide-black" : "divide-slate-100"}`}
      >
        {videos.map((video) => {
          const isSelected = selectedIds.includes(video.id);

          return (
            <tr
              key={video.id}
              className={`transition-colors ${
                isSelected
                  ? isDark
                    ? "bg-indigo-950/40"
                    : "bg-indigo-50/50"
                  : isDark
                    ? "hover:bg-slate-800/70"
                    : "hover:bg-slate-50/70"
              }`}
            >
              <td className="py-3 pl-5">
                <Checkbox
                  checked={isSelected}
                  onChange={() => onToggleSelected(video.id)}
                  label={`Select ${video.title}`}
                />
              </td>

              <td className="px-3 py-3">
                <div className="flex items-center gap-3">
                  <Thumbnail
                    video={video}
                    className="h-14 w-24 shrink-0 rounded-md"
                  />
                  <div className="min-w-0 max-w-sm">
                    <p
                      className={`truncate font-semibold ${
                        isDark ? "text-slate-100" : "text-slate-900"
                      }`}
                    >
                      {video.title}
                    </p>
                    <p
                      className={`mt-0.5 line-clamp-1 text-xs ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {video.description}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-3 py-3">
                <span
                  className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ${
                    isDark
                      ? "bg-indigo-950 text-indigo-300"
                      : "bg-indigo-50 text-indigo-700"
                  }`}
                >
                  {formatCategory(video.category as VideoEnum)}
                </span>
              </td>

              <td
                className={`px-3 py-3 tabular-nums ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                {video.year}
              </td>

              <td
                className={`px-3 py-3 text-right font-medium tabular-nums ${
                  isDark ? "text-slate-200" : "text-slate-800"
                }`}
              >
                #{video.displayOrder}
              </td>

              <td className="px-5 py-3">
                <div className="flex items-center justify-end">
                  <VideoActions
                    video={video}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={(id) => onDelete([id])}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default VideoTable;
