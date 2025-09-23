import { MdOutlineWatchLater } from "react-icons/md";

const DateOnly = ({ isoString }) => {
  const formattedDate = new Date(isoString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return <span className="flex items-center gap-1"><MdOutlineWatchLater /> Reported {formattedDate}</span>;
};
export default DateOnly;