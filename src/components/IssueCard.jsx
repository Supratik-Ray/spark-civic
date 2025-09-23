import { IoMdPerson } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";

const IssueCard = ({ issue }) => {
  const statusColor = {
    pending: "bg-blue-200 text-blue-900",
    in_progress: "bg-amber-200 text-amber-900",
    resolved: "bg-green-200 text-green-900",
  };

  const color = statusColor[issue.status];

  return (
    <div className="flex flex-col gap-5 border-gray-400 p-5 rounded-md shadow-lg bg-white hover:shadow-2xl transform hover:scale-105 transition duration-200">
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">{issue.title}</h2>
        <div>
          <span className={`${color} rounded-full p-1 px-2 text-sm font-bold`}>
            {issue.status}
          </span>
        </div>
      </div>
      <p className="text-gray-700">{issue.ticket_no}</p>
      <p className="text-gray-700 my-2">{issue.description}</p>
      <div className="flex justify-between">
        <span className="flex items-center gap-2">
          <i>
            <IoMdPerson />
          </i>
          {issue.created_by_name}
        </span>
        <span className="flex items-center gap-2">
          <i>
            <AiOutlineLike />
          </i>
          {issue.votes}
        </span>
      </div>
    </div>
  );
};

export default IssueCard;
