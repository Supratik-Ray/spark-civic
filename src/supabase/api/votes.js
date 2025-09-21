import supabase from "../supabaseClient.js";

export const getIssueVotesCount = async (issue_id) => {
  try {
    const { count, error } = await supabase
      .from("votes")
      .select("*", { count: "exact", head: true })
      .eq("issue_id", issue_id);

    if (error) throw error;

    return { success: true, count };
  } catch (error) {
    return { success: false, error };
  }
};
