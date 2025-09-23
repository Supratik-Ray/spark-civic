import supabase from "../supabaseClient";

export async function getIssueTimeline(issueId) {
  try {
    const { data, error } = await supabase
      .from("issue_timeline")
      .select(
        `
        id,
        issue_id,
        status,
        note,
        changed_by,
        changed_at: created_at,
        profiles (
          full_name
        )
      `
      )
      .eq("issue_id", issueId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching timeline:", error);
    return { success: false, error };
  }
}