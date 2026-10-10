import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createVideoAPI,
  getAllVideoByUser,
  getVideoByUserId,
  updateVideoAPI
} from "../services/video/videoService";
import { CreateVideo, UpdateVideo } from "../services/video/VideoTypes";

export const useVideo = () => {
  return useQuery({
    queryKey: ["video"],
    queryFn: getAllVideoByUser
  });
};
export const useVideoById = (id: string) => {
  return useQuery({
    queryKey: ["videoId", id],
    queryFn: () => getVideoByUserId(id)
  });
};
export const CreateVideoProps = () => {
  return useMutation({
    mutationKey: ["create-video"],
    mutationFn: (data: CreateVideo) => createVideoAPI(data)
  });
};
export const UpdateVideoProps = (id: string) => {
  return useMutation({
    mutationKey: ["update-video"],
    mutationFn: (data: UpdateVideo) => updateVideoAPI(id, data)
  });
};
