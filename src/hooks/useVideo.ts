import { useQuery } from "@tanstack/react-query";
import { getAllVideoByUser } from "../services/video/videoService";

export const useVideo = () => {
  return useQuery({
    queryKey: ["video"],
    queryFn: getAllVideoByUser
  });
};
