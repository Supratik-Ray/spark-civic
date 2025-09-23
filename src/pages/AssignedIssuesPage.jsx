import { useEffect, useState } from "react";
import IssueCards from "../components/IssueCards";
import { fetchIssues } from "../supabase/api/issues";
import { useAuth } from "../hooks/useAuth";

const AssignedIssuesPage = () => {
  const { session } = useAuth();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const getIssues = async () => {
      const result = await fetchIssues({ assigned_to: session.user.id });
      if (result.success) {
        setIssues(result.data);
      }
    };
    getIssues();
  }, [session.user.id]);

  console.log(issues);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="font-bold text-4xl p-5">Assigned Issues</h1>
      {issues.length === 0 ? (
        <div className="text-center p-10 text-lg">
          <p>No Issues found!</p>
        </div>
      ) : (
        <IssueCards issues={issues} />
      )}
    </div>
  );
};

export default AssignedIssuesPage;
