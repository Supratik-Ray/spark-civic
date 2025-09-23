const FilterInputs = ({
  issueFilters,
  handleFilterChange,
  searchQuery,
  handleSearchInput,
}) => {
  return (
    <div className="grid grid-cols-12 p-5 gap-3">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInput}
        placeholder="Search Issues"
        className="border border-gray-300 p-2 rounded-md col-span-12 md:col-span-6"
      />

      <select
        name="status"
        id="status"
        onChange={handleFilterChange}
        value={issueFilters.status || ""}
        className="col-span-12 md:col-span-2 border border-gray-300 rounded-md p-2"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

      <select
        name="category_id"
        id="category_id"
        onChange={handleFilterChange}
        value={issueFilters.category_id || ""}
        className="col-span-12 md:col-span-2 border border-gray-300 rounded-md p-2"
      >
        <option value="">All Categories</option>
        <option value={2}>Road</option>
        <option value={3}>Water</option>
        <option value={1}>Electricity</option>
        <option value={4}>Waste Management</option>
      </select>

      <select
        name="radius"
        id="radius"
        onChange={handleFilterChange}
        value={issueFilters.radius || ""}
        className="col-span-12 md:col-span-2 border border-gray-300 rounded-md p-2"
      >
        <option value="">Range</option>
        <option value={500}>500m</option>
        <option value={1000}>1km</option>
        <option value={5000}>5km</option>
        <option value={10000}>10km</option>
      </select>
    </div>
  );
};

export default FilterInputs;
