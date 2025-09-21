import { useContext, createContext } from "react";

export const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth can only be used inside AuthProvider");
  return context;
}
