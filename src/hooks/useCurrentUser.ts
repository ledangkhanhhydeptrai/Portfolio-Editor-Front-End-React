
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/profile/profileService";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false
  });
};
