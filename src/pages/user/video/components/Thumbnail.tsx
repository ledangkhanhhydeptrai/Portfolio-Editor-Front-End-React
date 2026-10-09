import React, { useState } from "react";
import { Play } from "lucide-react";
import { VideoProps } from "../../../../services/video/VideoTypes";

interface ThumbnailProps {
  video: VideoProps;
  className: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ video, className = "" }) => {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(video.thumbnailUrl) && !failed;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 ${className}`}
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
          <Play size={20} className="fill-current" />
        </div>
      )}

      <span className="absolute bottom-1 right-1 rounded bg-slate-950/80 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white">
        {video.duration}
      </span>
    </div>
  );
};

export default Thumbnail;