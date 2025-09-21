import { IoMdPerson } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";

const AdminIssueCard = ({ issue }) => {
  return (
    <div className="flex flex-col gap-5 relative border-gray-400 p-5 rounded-md shadow-lg bg-white hover:shadow-2xl transform hover:scale-105 transition duration-200">
      <h2 className="font-semibold text-2xl">{issue.title}</h2>
      <p className="text-gray-700">{issue.tktNo}</p>
      <span
        className={`${issue.statusColor} absolute top-5 right-5 rounded-full p-1 px-2 text-sm font-bold`}
      >
        {issue.status}
      </span>
      <p className="text-gray-700 my-2">{issue.description}</p>
      <div className="flex justify-between">
        <span className="flex items-center gap-2">
          <i>
            <IoMdPerson />
          </i>
          {issue.createdBy}
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

export default AdminIssueCard;
