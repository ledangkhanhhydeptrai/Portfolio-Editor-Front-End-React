import { useMutation } from "@tanstack/react-query";
import { AuthLogin } from "../services/auth/authService";
import type { LoginRequest } from "../services/auth/authTypes";
import { useAuth } from "../contexts/AuthContext";

export const useLogin = () => {
  const {
    setIsAuthenticated,
    setUser,
    setRole,
    setAuthReady,
  } = useAuth();

  return useMutation({
    mutationFn: (payload: LoginRequest) => AuthLogin(payload),

    onSuccess: (response) => {
      if (response.status !== 200 || !response.data) {
        setUser(null);
        setRole(null);
        setIsAuthenticated(false);
        setAuthReady(true);
        return;
      }

      setUser(response.data);
      setRole(response.data.role);
      setIsAuthenticated(true);
      setAuthReady(true);
    },

    onError: () => {
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      setAuthReady(true);
    },
  });
};