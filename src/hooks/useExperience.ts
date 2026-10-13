import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateExperienceAPI,
  DeleteExperienceAPI,
  getAllExperience,
  getExperienceById,
  UpdateExperienceAPI
} from "../services/experience/ExperienceService";
import { CreateExperienceProps } from "../services/experience/ExperienceTypes";

export const useGetAllExperience = () => {
  return useQuery({
    queryKey: ["get-all-experience"],
    queryFn: getAllExperience
  });
};
export const useGetExperienceById = (id: string) => {
  return useQuery({
    queryKey: ["get-experience"],
    queryFn: () => getExperienceById(id)
  });
};
export const useCreateExperience = () => {
  const clientQuery = useQueryClient();
  return useMutation({
    mutationKey: ["create-experience"],
    mutationFn: (data: CreateExperienceProps) => CreateExperienceAPI(data),
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ["get-all-experience"]
      });
    }
  });
};
export const useUpdateExperience = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-experience", id],
    mutationFn: (data: CreateExperienceProps) =>
      UpdateExperienceAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-experience", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-experience"],
      });
    },
  });
};
export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-experience"],
    mutationFn: (id: string) => DeleteExperienceAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-experience"]
      });
    }
  });
};
