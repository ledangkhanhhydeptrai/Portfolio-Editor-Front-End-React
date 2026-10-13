import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateProjectAPI,
  DeleteProjectAPI,
  getAllProject,
  getProjectById,
  UpdateProjectAPI
} from "../services/project/ProjectService";
import { CreateProjectProps } from "../services/project/ProjectTypes";

export const useGetAllProject = () => {
  return useQuery({
    queryKey: ["get-all-project"],
    queryFn: getAllProject
  });
};
export const useGetProjectById = (id: string) => {
  return useQuery({
    queryKey: ["get-project-by-id", id],
    queryFn: () => getProjectById(id)
  });
};
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-project"],
    mutationFn: (data: CreateProjectProps) => CreateProjectAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-project"]
      });
    }
  });
};
export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-project"],
    mutationFn: (data: CreateProjectProps) => UpdateProjectAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-project"]
      });
    }
  });
};
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-project"],
    mutationFn: (id: string) => DeleteProjectAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-project"]
      });
    }
  });
};
