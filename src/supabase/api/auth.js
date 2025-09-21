import supabase from "../supabaseClient";

// ----------------------------
// AUTH FUNCTIONS
// ----------------------------

export const signUpUser = async ({
  email,
  password,
  full_name,
  role = "user",
}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name, role },
      },
    });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export const signInUser = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const getCurrentUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return { success: true, user };
  } catch (error) {
    return { success: false, error };
  }
};

export const fetchProfile = async (user_id) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user_id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
