import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createVideoAPI,
  deleteVideoAPI,
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-video"],
    mutationFn: (data: CreateVideo) => createVideoAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["video"]
      });
    }
  });
};
export const UpdateVideoProps = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-video"],
    mutationFn: (data: UpdateVideo) => updateVideoAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["video"]
      });
    }
  });
};

export const DeleteVideoProps = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-video"],
    mutationFn: (id: string) => deleteVideoAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["video"]
      });
    }
  });
};
