
import { useMutation } from "@tanstack/react-query";
import { AuthLogin } from "../services/auth/authService";
import { getCurrentUser } from "../services/profile/profileService";
import { LoginRequest } from "../services/auth/authTypes";
import { useAuth } from "../contexts/AuthContext";

export const useLogin = () => {
  const { setIsAuthenticated, setUser } = useAuth();

  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      await AuthLogin(payload);
      return getCurrentUser();
    },
    onSuccess: (response) => {
      if (response.status !== 200 || !response.data) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      setUser(response.data);
      setIsAuthenticated(true);
    },
  });
};