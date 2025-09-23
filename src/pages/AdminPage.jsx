import { useEffect, useState } from "react";
import AdminInput from "../components/AdminInput";
import AdminIssueCards from "../components/AdminIssueCards";
import AdminStatusCards from "../components/AdminStatusCards";
import { fetchIssues } from "../supabase/api/issues";

const AdminPage = () => {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState();

  useEffect(() => {
    const getIssues = async () => {
      const result = await fetchIssues(
        statusFilter === "all_status" ? {} : { status: statusFilter }
      );
      if (result.success) {
        setIssues(result.data);
      }
    };
    getIssues();
  }, [statusFilter]);

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const totalIssues = issues.length;
  const pendingIssues = issues.filter(
    (issue) => issue.status === "pending"
  ).length;
  const inProgressIssues = issues.filter(
    (issue) => issue.status === "in_progress"
  ).length;
  const resolvedIssues = issues.filter(
    (issue) => issue.status === "resolved"
  ).length;

  const statusCards = [
    {
      issueTitle: "Total Issues",
      issueNum: totalIssues,
      color: "border-white",
    },
    {
      issueTitle: "Pending Issues",
      issueNum: pendingIssues,
      color: "border-blue-500",
    },
    {
      issueTitle: "In Progress",
      issueNum: inProgressIssues,
      color: "border-amber-500",
    },
    {
      issueTitle: "Resolved",
      issueNum: resolvedIssues,
      color: "border-green-500",
    },
  ];

  console.log(issues);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="font-bold text-4xl p-5">Admin Dashboard</h1>
      <AdminStatusCards statusCards={statusCards} />
      <AdminInput handleFilterChange={handleFilterChange} />
      <AdminIssueCards issues={issues} />
    </div>
  );
};

export default AdminPage;
