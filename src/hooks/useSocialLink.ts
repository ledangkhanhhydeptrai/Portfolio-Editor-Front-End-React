import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateSocialLinkAPI,
  getAllSocialLink,
  getSocialLinkById
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
