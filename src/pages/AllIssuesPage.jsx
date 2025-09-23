import { useEffect, useState } from "react";
import FilterInputs from "../components/FilterInputs";
import IssueCards from "../components/IssueCards";
import StatusCards from "../components/StatusCards";
import { fetchIssues } from "../supabase/api/issues";
import useGeoLocation from "../hooks/useGeolocation";

const AllIssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [issueFilters, setIssueFilter] = useState({
    lon: null,
    lat: null,
    radius: null,
    status: null,
    category_id: null,
    assigned_to: null,
    created_by: null,
  });

  const location = useGeoLocation();

  useEffect(() => {
    if (location) {
      setIssueFilter((prev) => ({
        ...prev,
        lat: location[0],
        lon: location[1],
      }));
    }
  }, [location]);

  useEffect(() => {
    const getIssues = async () => {
      const result = await fetchIssues(issueFilters);
      if (result.success) {
        setIssues(result.data);
      }
    };
    getIssues();
  }, [issueFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setIssueFilter((prev) => ({ ...prev, [name]: value || null }));
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredIssues = issues.filter((issue) =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalIssues = filteredIssues.length;
  const pendingIssues = filteredIssues.filter(
    (issue) => issue.status === "pending"
  ).length;
  const inProgressIssues = filteredIssues.filter(
    (issue) => issue.status === "in_progress"
  ).length;
  const resolvedIssues = filteredIssues.filter(
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
      <h1 className="font-bold text-4xl p-5">All Issues</h1>
      <StatusCards statusCards={statusCards} />
      <FilterInputs
        issueFilters={issueFilters}
        handleFilterChange={handleFilterChange}
        handleSearchInput={handleSearchInput}
        searchQuery={searchQuery}
      />
      <IssueCards issues={filteredIssues} />
    </div>
  );
};

export default AllIssuesPage;
