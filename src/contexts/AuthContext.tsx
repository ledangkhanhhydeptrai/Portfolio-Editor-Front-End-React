import React, { createContext, useContext, useState } from "react";
import { LoginResponse } from "../services/auth/authTypes";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: LoginResponse | null;
  setUser: React.Dispatch<React.SetStateAction<LoginResponse | null>>;
  role: string | null;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  authReady: boolean;
  setAuthReady: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        role,
        setRole,
        authReady,
        setAuthReady
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
