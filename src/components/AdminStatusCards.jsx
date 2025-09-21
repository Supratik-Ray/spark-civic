const AdminStatusCards = ({ statusCards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5">
      {statusCards.map((card, index) => {
        return (
          <div
            key={index}
            className={`${card.color} border-1 border-l-3 p-5 rounded-md bg-white shadow-lg`}
          >
            <h4 className="text-xl font-bold">{card.issueTitle}</h4>
            <h2 className="font-bold text-3xl">{card.issueNum}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStatusCards;
