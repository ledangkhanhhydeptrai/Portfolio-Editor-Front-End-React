import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createVideoAPI,
  getAllVideoByUser,
  getVideoByUserId
} from "../services/video/videoService";
import { CreateVideo } from "../services/video/VideoTypes";

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
