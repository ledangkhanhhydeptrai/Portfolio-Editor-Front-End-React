import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateProfile,
  getCurrentUser
} from "../services/profile/profileService";
import { CreateUserProfile } from "../services/profile/profileTypes";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false
  });
};
export const useCreateCurrentUser = () => {
  return useMutation({
    mutationKey: ["create-profile"],
    mutationFn: (data: CreateUserProfile) => CreateProfile(data)
  });
};
