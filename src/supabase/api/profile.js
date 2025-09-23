import supabase from "../supabaseClient";

export const fetchAdmins = async () => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("role", "admin");

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching admins:", error.message);
    return { success: false, error };
  }
};
