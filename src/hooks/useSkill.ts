import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateSkillService,
  getAllSkillService,
  getSkillService
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
  return useMutation({
    mutationKey: ["create-skill"],
    mutationFn: (data: CreateSkillProps) => CreateSkillService(data)
  });
};
