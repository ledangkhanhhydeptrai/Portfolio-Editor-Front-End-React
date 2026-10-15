import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateProfile,
  getCurrentUser,
  UpdateProfile
} from "../services/profile/profileService";
import {
  CreateUserProfile,
  UpdateProfileProps
} from "../services/profile/profileTypes";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false
  });
};

export const useCreateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-profile"],
    mutationFn: (data: CreateUserProfile) => CreateProfile(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["current-user"]
      });
    }
  });
};

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: (data: UpdateProfileProps) => UpdateProfile(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["current-user"]
      });
    }
  });
};

