import AdminInput from "../components/AdminInput";
import AdminIssueCards from "../components/AdminIssueCards";
import AdminStatusCards from "../components/AdminStatusCards";

const statusCards = [
  {
    issueTitle: "Total Issues",
    issueNum: 156,
    color: "border-white",
  },
  {
    issueTitle: "Pending Issues",
    issueNum: 23,
    color: "border-blue-500",
  },
  {
    issueTitle: "In Progress",
    issueNum: 44,
    color: "border-amber-500",
  },
  {
    issueTitle: "Resolved",
    issueNum: 89,
    color: "border-green-500",
  },
];

const issues = [
  {
    title: "Pothole",
    description:
      "There is a dangerous pothole near the intersection of Main St and 5th Ave. Multiple vehicles have been damaged.",
    status: "resolved",
    statusColor: "bg-green-200 text-green-500",
    tktNo: "TKT-202",
    createdBy: "John",
    votes: 24,
  },
  {
    title: "Pothole",
    description:
      "There is a dangerous pothole near the intersection of Main St and 5th Ave. Multiple vehicles have been damaged.",
    status: "pending",
    statusColor: "bg-blue-200 text-blue-500",
    tktNo: "TKT-202",
    createdBy: "John",
    votes: 24,
  },
  {
    title: "Pothole",
    description:
      "There is a dangerous pothole near the intersection of Main St and 5th Ave. Multiple vehicles have been damaged.",
    status: "resolved",
    statusColor: "bg-yellow-200 text-yellow-500",
    tktNo: "TKT-202",
    createdBy: "John",
    votes: 24,
  },
];

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="font-bold text-4xl p-5">Admin Dashboard</h1>
      <AdminStatusCards statusCards={statusCards} />
      <AdminInput />
      <AdminIssueCards issues={issues} />
    </div>
  );
};

export default AdminPage;
