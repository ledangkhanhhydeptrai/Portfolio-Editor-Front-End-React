import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createWorkStyleAPI,
  DeleteWorkStyleAPI,
  getAllWorkStyle,
  getWorkStyleById,
  updateWorkStyleAPI
} from "../services/work-style/WorkStyleService";

import type { WorkStyleCreate } from "../services/work-style/WorkStyleTypes";

export const useWorkStyle = () => {
  return useQuery({
    queryKey: ["work-style"],
    queryFn: getAllWorkStyle
  });
};

export const useWorkStyleById = (id: string) => {
  return useQuery({
    queryKey: ["work-style-user-id", id],
    queryFn: () => getWorkStyleById(id),
    enabled: id.length > 0
  });
};

export const CreateWorkStyle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-work-style"],
    mutationFn: (data: WorkStyleCreate) => createWorkStyleAPI(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["work-style"]
      });
    }
  });
};
export const UpdateWorkStyle = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-work-style"],
    mutationFn: (data: WorkStyleCreate) => updateWorkStyleAPI(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["work-style"]
      });
    }
  });
};
export const DeleteWorkStyle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-work-style"],
    mutationFn: (id: string) => DeleteWorkStyleAPI(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["work-style"]
      });
    }
  });
};
