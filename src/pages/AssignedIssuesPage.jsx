import { useEffect, useState } from "react";
import IssueCards from "../components/IssueCards";
import { fetchIssues } from "../supabase/api/issues";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const AssignedIssuesPage = () => {
  const { session } = useAuth();
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getIssues = async () => {
      setIsLoading(true);
      const result = await fetchIssues({ assigned_to: session.user.id });
      if (result.success) {
        setIssues(result.data);
      } else {
        toast.error("Error fetching issues!");
      }
      setIsLoading(false);
    };
    getIssues();
  }, [session.user.id]);

  return (
    <div className="min-h-screen bg-gray-100 p-3 md:5 lg:p-10">
      <h1 className="font-bold text-4xl p-5">Assigned Issues</h1>
      {issues.length === 0 ? (
        <div className="text-center p-10 text-lg">
          <p>No Issues found!</p>
        </div>
      ) : (
        <IssueCards issues={issues} isLoading={isLoading} />
      )}
    </div>
  );
};

export default AssignedIssuesPage;
