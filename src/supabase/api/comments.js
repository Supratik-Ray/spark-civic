import supabase from "../supabaseClient";

// CREATE COMMENT FOR AN ISSUE
export const createIssueComment = async ({ issue_id, user_id, comment }) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([{ issue_id, user_id, comment }])
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// FETCH COMMENTS FOR AN ISSUE
export const fetchCommentsByIssueId = async (issue_id) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select(
        `
        id,
        comment,
        created_at,
        user_id,
        profiles (
          id,
          full_name,
          role
        )
      `
      )
      .eq("issue_id", issue_id)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
