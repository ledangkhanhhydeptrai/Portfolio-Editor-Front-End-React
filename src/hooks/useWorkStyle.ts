import { useQuery } from "@tanstack/react-query";
import { getAllWorkStyle } from "../services/work-style/WorkStyleService";

export const useWorkStyle = () => {
  return useQuery({
    queryKey: ["work-style"],
    queryFn: getAllWorkStyle
  });
};
