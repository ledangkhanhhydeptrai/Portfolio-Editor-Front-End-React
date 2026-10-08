
import { useMutation } from "@tanstack/react-query";
import { AuthLogin } from "../services/auth/authService";
import { LoginRequest } from "../services/auth/authTypes";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginRequest) => AuthLogin(payload)
  });
};
