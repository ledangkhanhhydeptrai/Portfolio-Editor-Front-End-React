import React from "react";
import { Plus } from "lucide-react";
import Button from "../../../../components/ui/Button";

interface VideoHeaderProps {
  isDark: boolean;
  onCreate: () => void;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({ isDark, onCreate }) => (
  <div className="flex shrink-0 flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div>
      <h2
        className={`text-2xl font-semibold tracking-tight ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        Videos
      </h2>

      <p
        className={`mt-1 text-sm ${
          isDark ? "text-slate-400" : "text-slate-600"
        }`}
      >
        Upload, organize and publish the videos shown on your portfolio.
      </p>
    </div>

    <Button
      type="button"
      variant="primary"
      onClick={onCreate}
      className="!rounded-lg !bg-indigo-600 !px-4 !py-2.5 !font-medium !shadow-sm hover:!bg-indigo-700"
    >
      <Plus size={18} />
      Add video
    </Button>
  </div>
);

export default VideoHeader;
