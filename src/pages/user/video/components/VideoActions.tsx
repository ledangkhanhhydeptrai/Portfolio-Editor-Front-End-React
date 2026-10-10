import React from "react";
import { Eye, ExternalLink, Pencil, Trash2 } from "lucide-react";

import IconButton from "./IconButton";
import { VideoProps } from "../../../../services/video/VideoTypes";

interface VideoActionsProps {
  video: VideoProps;
  onView: (videoUrl: string) => void;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

/** View details / Open / Edit / Delete buttons. */
const VideoActions: React.FC<VideoActionsProps> = ({
  video,
  onView,
  onViewDetails,
  onEdit,
  onDelete
}) => (
  <>
    <IconButton label="Xem chi tiết" onClick={() => onViewDetails(video.id)}>
      <Eye size={16} />
    </IconButton>

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
