const IssueHomeStatus = ({ text, num, icon: Icon }) => {
  return (
    <div className="relative flex items-center justify-between border-[2px] border-gray-200 rounded-[10px] bg-white py-4 sm:py-6 px-4 sm:px-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      {/* left content */}
      <div className="flex flex-col gap-1.5 sm:gap-2.5">
        <p className="text-xs sm:text-sm text-gray-500 font-semibold">{text}</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{num}</h2>
      </div>

      {/* icon */}
      <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
        <Icon className="text-blue-600 text-lg sm:text-xl md:text-2xl" />
      </div>

      {/* extra circle */}
      <div className="bg-blue-500 opacity-10 h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 absolute -right-5 -bottom-5 rounded-full"></div>
    </div>
  );
};

export default IssueHomeStatus;
