import { useMutation } from "@tanstack/react-query";
import { LogoutAPI } from "../services/auth/authService";

export const useLogout = () => {
  return useMutation({
    mutationFn: LogoutAPI
  });
};
