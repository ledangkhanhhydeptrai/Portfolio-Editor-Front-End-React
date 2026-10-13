import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateSkillService,
  DeleteSkillService,
  getAllSkillService,
  getSkillService,
  UpdateSkillService
} from "../services/skill/SkillService";
import { CreateSkillProps } from "../services/skill/SkillTypes";

export const useGetAllSkill = () => {
  return useQuery({
    queryKey: ["get-all-skill"],
    queryFn: getAllSkillService
  });
};
export const useSkill = (id: string) => {
  return useQuery({
    queryKey: ["get-skill"],
    queryFn: () => getSkillService(id)
  });
};
export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-skill"],
    mutationFn: (data: CreateSkillProps) => CreateSkillService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skills"]
      });
    }
  });
};
export const useUpdateSkill = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-skill"],
    mutationFn: (data: CreateSkillProps) => UpdateSkillService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skills"]
      });
    }
  });
};
export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-skill"],
    mutationFn: (id: string) => DeleteSkillService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skills"]
      });
    }
  });
};
