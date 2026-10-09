import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "../services/profile/profileService";
import { UserProfile } from "../services/profile/profileTypes";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  authReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getCurrentUser();

        if (response.status !== 200 || !response.data) {
          setUser(null);
          setIsAuthenticated(false);
          return;
        }

        setUser(response.data);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setAuthReady(true);
      }
    };

    void checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        authReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth phải nằm trong AuthProvider");
  }

  return context;
};