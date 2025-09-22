import { useEffect, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import supabase from "../supabase/supabaseClient";
import {
  fetchProfile,
  signInUser,
  signOutUser,
  signUpUser,
} from "../supabase/api/auth";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSession = async (session) => {
    if (session) {
      setSession(session);
      const result = await fetchProfile(session.user.id);

      if (result.success) {
        setProfile(result.data);
      } else {
        console.error("Profile fetch error:", result.error.message);
        setProfile(null);
      }
    } else {
      setSession(null);
      setProfile(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // On mount → load session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("🔹 Initial session:", session);
      handleSession(session);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("🔔 Auth state changed:", _event, session);
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) =>
    await signInUser({ email, password });

  const signUp = async (email, password, fullName) =>
    await signUpUser({ email, password, full_name: fullName });

  const logout = async () => {
    await signOutUser();
    setSession(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{ session, isLoading, profile, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
