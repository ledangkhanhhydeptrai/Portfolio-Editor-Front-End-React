import { useQuery } from "@tanstack/react-query";
import { getAllExperience } from "../services/experience/ExperienceService";

export const useGetAllExperience = () => {
  return useQuery({
    queryKey: ["get-all-experience"],
    queryFn: getAllExperience
  });
};
