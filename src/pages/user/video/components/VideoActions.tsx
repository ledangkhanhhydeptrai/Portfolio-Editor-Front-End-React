import React from "react";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import IconButton from "./IconButton";
import { VideoProps } from "../../../../services/video/VideoTypes";

interface VideoActionsProps {
  video: VideoProps;
  onView: (videoUrl: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

/** Open / Edit / Delete buttons shared by the table and the grid. */
const VideoActions: React.FC<VideoActionsProps> = ({
  video,
  onView,
  onEdit,
  onDelete
}) => (
  <>
    <IconButton label="Open video" onClick={() => onView(video.videoUrl)}>
      <ExternalLink size={16} />
    </IconButton>
    <IconButton label="Edit video" onClick={() => onEdit(video.id)}>
      <Pencil size={16} />
    </IconButton>
    <IconButton label="Delete video" danger onClick={() => onDelete(video.id)}>
      <Trash2 size={16} />
    </IconButton>
  </>
);

export default VideoActions;
