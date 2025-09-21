import { useEffect, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import supabase from "../supabase/supabaseClient";
import { signInUser, signOutUser, signUpUser } from "../api/authApi";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //load session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    //subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => await signInUser(email, password);
  const signUp = async (email, password) => await signUpUser(email, password);
  const logout = async () => await signOutUser();

  return (
    <AuthContext.Provider value={{ session, isLoading, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
