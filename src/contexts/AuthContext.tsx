import React, { createContext, useContext, useState } from "react";
import type { LoginResponse } from "../services/auth/authTypes";
import { AUTH_UNAUTHORIZED_EVENT } from "../services/auth/authEvents";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: LoginResponse | null;
  setUser: React.Dispatch<React.SetStateAction<LoginResponse | null>>;
  role: string | null;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  authReady: boolean;
  setAuthReady: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<LoginResponse | null>(() => {
    const savedUser = sessionStorage.getItem("auth_user");

    if (savedUser === null) {
      return null;
    }

    try {
      return JSON.parse(savedUser) as LoginResponse;
    } catch {
      sessionStorage.removeItem("auth_user");
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(user !== null);
  const [role, setRole] = useState<string | null>(
    user === null ? null : user.role
  );
  const [authReady, setAuthReady] = useState(true);

  const updateUser = (nextUser: React.SetStateAction<LoginResponse | null>) => {
    setUser((currentUser) => {
      const resolvedUser =
        typeof nextUser === "function" ? nextUser(currentUser) : nextUser;

      if (resolvedUser === null) {
        sessionStorage.removeItem("auth_user");
      } else {
        sessionStorage.setItem("auth_user", JSON.stringify(resolvedUser));
      }

      return resolvedUser;
    });
  };

  const logout = React.useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("auth_user");
    setIsAuthenticated(false);
    setRole(null);
  }, []);

  React.useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);

    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser: updateUser,
        role,
        setRole,
        authReady,
        setAuthReady,
        logout
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
