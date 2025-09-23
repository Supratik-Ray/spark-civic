import IssueCard from "./IssueCard";
import { Link } from "react-router-dom";

const IssueCards = ({ issues }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
      {issues.map((issue) => {
        return (
          <Link to={`/issues/${issue.id}`}>
            <IssueCard issue={issue} key={issue.id} />
          </Link>
        );
      })}
    </div>
  );
};

export default IssueCards;
