import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEducationAPI,
  deleteEducationAPI,
  getAllEducation,
  getEducationById,
  updateEducationAPI
} from "../services/education/EducationService";
import { CreateEducationProps } from "../services/education/EducationTypes";

export const useGetAllEducation = () => {
  return useQuery({
    queryKey: ["get-all-education"],
    queryFn: getAllEducation
  });
};
export const useGetEducationById = (id: string) => {
  return useQuery({
    queryKey: ["get-education", id],
    queryFn: () => getEducationById(id)
  });
};
export const useCreateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-education"],
    mutationFn: (data: CreateEducationProps) => createEducationAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-education"]
      });
    }
  });
};
export const useUpdateEducation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-education", id],
    mutationFn: (data: CreateEducationProps) => updateEducationAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-education"]
      });
    }
  });
};
export const useDeleteEducation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-education"],
    mutationFn: () => deleteEducationAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-education"]
      });
    }
  });
};
