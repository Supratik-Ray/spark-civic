import AdminIssueCard from "./AdminIssueCard";

const AdminIssueCards = ({ issues }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
      {issues.map((issue) => {
        return <AdminIssueCard issue={issue} />;
      })}
    </div>
  );
};

export default AdminIssueCards;
