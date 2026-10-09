import { useMutation } from "@tanstack/react-query";
import { AuthLogin } from "../services/auth/authService";
import { LoginRequest } from "../services/auth/authTypes";
import { useAuth } from "../contexts/AuthContext";

export const useLogin = () => {
  const { setIsAuthenticated, setUser } = useAuth();

  return useMutation({
    mutationFn: (payload: LoginRequest) => AuthLogin(payload),

    onSuccess: (response) => {
      setIsAuthenticated(true);
      setUser(response.data);
    },
  });
};
