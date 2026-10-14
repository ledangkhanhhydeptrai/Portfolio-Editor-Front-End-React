import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateCurriculumAPI,
  CurriculumService,
  CurriculumServiceById,
  DeleteCurriculumAPI,
  UpdateCurriculumAPI
} from "../services/curriculum/CurriculumService";
import {
  CreateCurriculumProps,
  UpdateCurriculumProps
} from "../services/curriculum/CurriculumTypes";

export const useGetAllCurriculum = () => {
  return useQuery({
    queryKey: ["get-all-curriculum"],
    queryFn: CurriculumService
  });
};
export const useGetCurriculumById = (id: string) => {
  return useQuery({
    queryKey: ["get-all-curriculum"],
    queryFn: () => CurriculumServiceById(id)
  });
};
export const useCreateCurriculum = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-CV"],
    mutationFn: (data: CreateCurriculumProps) => CreateCurriculumAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-curriculum"]
      });
    }
  });
};

export const useUpdateCurriculum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-CV"],
    mutationFn: (variables: { id: string; data: UpdateCurriculumProps }) =>
      UpdateCurriculumAPI(variables.id, variables.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-curriculum"]
      });
    }
  });
};
export const useDeleteCurriculum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-CV"],
    mutationFn: (id: string) => DeleteCurriculumAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-curriculum"]
      });
    }
  });
};
