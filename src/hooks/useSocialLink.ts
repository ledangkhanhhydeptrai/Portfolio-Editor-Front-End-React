import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateSocialLinkAPI,
  DeleteSocialLinkById,
  getAllSocialLink,
  getSocialLinkById,
  updateSocialLinkById
} from "../services/social-link/SocialLinkService";
import { CreateSocialLink } from "../services/social-link/SocialLinkTypes";

export const useSocialLink = () => {
  return useQuery({
    queryKey: ["social-link"],
    queryFn: getAllSocialLink
  });
};
export const UseSocialLinkById = (id: string) => {
  return useQuery({
    queryKey: ["get-social-link", id],
    queryFn: () => getSocialLinkById(id)
  });
};
export const useCreateSocialLink = () => {
  return useMutation({
    mutationKey: ["create-social-link"],
    mutationFn: (data: CreateSocialLink) => CreateSocialLinkAPI(data)
  });
};
export const useUpdateSocialLink = (id: string) => {
  return useMutation({
    mutationKey: ["update-social-link"],
    mutationFn: (data: CreateSocialLink) => updateSocialLinkById(id, data)
  });
};
export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-social-link"],
    mutationFn: (id: string) => DeleteSocialLinkById(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["social-link"]
      });
    }
  });
};
