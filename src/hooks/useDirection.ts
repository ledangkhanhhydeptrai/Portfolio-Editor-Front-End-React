import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateDirectionAPI,
  DeleteDirection,
  getAllDirection,
  getDirectionById,
  UpdateDirectionAPI
} from "../services/direction/directionService";
import {
  CreateDirectionProps,
  UpdateDirectionProps
} from "../services/direction/directionTypes";

export const useGetALLDirection = () => {
  return useQuery({
    queryKey: ["Get-All-Direction"],
    queryFn: getAllDirection
  });
};
export const useGetDirection = (id: string) => {
  return useQuery({
    queryKey: ["Get-Direction"],
    queryFn: () => getDirectionById(id)
  });
};
export const useCreateDirection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-direction"],
    mutationFn: (data: CreateDirectionProps) => CreateDirectionAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Get-All-Direction"]
      });
    }
  });
};
export const useUpdateDirection = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-direction"],
    mutationFn: (data: UpdateDirectionProps) => UpdateDirectionAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Get-All-Direction"]
      });
    }
  });
};
export const useDeleteDirection = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-direction"],
    mutationFn: () => DeleteDirection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Get-All-Direction"]
      });
    }
  });
};
