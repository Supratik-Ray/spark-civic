import { BiLoaderCircle } from "react-icons/bi";
import IssueCard from "./IssueCard";
import { Link } from "react-router-dom";

const IssueCards = ({ issues, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-5 flex justify-center items-center">
        <BiLoaderCircle className="animate-spin h-15 w-15" />
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="p-5 flex justify-center items-center">
        <p className="text-lg text-gray-700">No issues found!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
      {issues.map((issue) => {
        return (
          <Link to={`/issues/${issue.id}`} key={issue.id}>
            <IssueCard issue={issue} />
          </Link>
        );
      })}
    </div>
  );
};

export default IssueCards;
