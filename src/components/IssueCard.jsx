import { IoMdPerson } from "react-icons/io";
import { format } from "date-fns"; // optional: for date formatting

const category = {
  1: "⚡ Electricity",
  2: "🛣️ Road",
  3: "💧 Water",
  4: "🗑️ Garbage",
};

const IssueCard = ({ issue }) => {
  const statusColor = {
    pending: "bg-blue-200 text-blue-900",
    in_progress: "bg-amber-200 text-amber-900",
    resolved: "bg-green-200 text-green-900",
  };

  const color = statusColor[issue.status];
  const categoryIcon = category[issue.category_id]
    ? category[issue.category_id].split(" ")[0] // first part = emoji
    : "❓";

  // Format created_at date
  const createdAt = issue.created_at
    ? format(new Date(issue.created_at), "dd MMM yyyy")
    : "";

  return (
    <div
      className="flex flex-col justify-between border-gray-300 p-4 rounded-xl shadow-md bg-white min-h-[180px] 
      transform transition duration-200 hover:scale-105 hover:shadow-2xl"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-1">
        <h2 className="font-semibold text-lg flex items-center gap-2 line-clamp-2">
          <span className="text-xl">{categoryIcon}</span>
          {issue.title}
        </h2>
        <span
          className={`${color} rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap`}
        >
          {issue.status}
        </span>
      </div>

      {/* Ticket No */}
      <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">
        #{issue.ticket_no}
      </p>

      {/* Description */}
      <p className="text-gray-700 text-sm flex-grow line-clamp-3 mb-2">
        {issue.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center text-gray-600 text-sm mt-auto">
        <span className="flex items-center gap-2">
          <IoMdPerson className="text-lg" />
          {issue.created_by_name}
        </span>
        <span className="text-gray-400 text-xs">{createdAt}</span>
      </div>
    </div>
  );
};

export default IssueCard;
