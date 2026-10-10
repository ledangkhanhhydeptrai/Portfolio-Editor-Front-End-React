import React, { useState } from "react";
import { Play } from "lucide-react";
import { VideoProps } from "../../../../services/video/VideoTypes";

interface ThumbnailProps {
  video: VideoProps;
  /**
   * Tùy chọn. Nếu truyền kích thước (vd: "h-10 w-16") thì nó sẽ thay cho
   * kích thước mặc định bên dưới.
   */
  className?: string;
}

/** Kích thước mặc định: 80 x 48 px (tỉ lệ ~5:3), vừa mắt ở zoom 100%. */
const DEFAULT_SIZE = "h-12 w-20";

const Thumbnail: React.FC<ThumbnailProps> = ({ video, className }) => {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(video.thumbnailUrl) && !failed;

  return (
    <div
      className={`relative max-h-36 shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-slate-200 to-slate-300 ring-1 ring-black/5 dark:from-slate-700 dark:to-slate-800 dark:ring-white/10 ${
        className && className.trim() ? className : DEFAULT_SIZE
      }`}
    >
      {showImage ? (
        <img
          src={video.thumbnailUrl ?? undefined}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-slate-400">
          <Play size={16} className="fill-current" />
        </div>
      )}

      <span className="absolute bottom-0.5 right-0.5 rounded bg-slate-950/80 px-1 py-px text-[10px] font-medium leading-4 tabular-nums text-white">
        {video.duration}
      </span>
    </div>
  );
};

export default Thumbnail;