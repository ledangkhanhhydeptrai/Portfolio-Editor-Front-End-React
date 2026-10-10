import React from "react";
import VideoCreateModal from "./components/VideoCreateModal";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  isDark: boolean;
}

const VideoCreate: React.FC<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  isDark,
}) => {
  if (!isModalOpen) {
    return null;
  }

  return (
    <VideoCreateModal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      isDark={isDark}
    />
  );
};

export default VideoCreate;