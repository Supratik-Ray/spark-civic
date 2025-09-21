const AdminInput = () => {
  return (
    <div className="grid grid-cols-12 p-5 gap-3">
      <input
        type="text"
        placeholder="Search Issues"
        className="border border-gray-300 p-2 rounded-md col-span-12 md:col-span-6"
      />

      <select
        name="status"
        id="status"
        className="col-span-12 md:col-span-2 border border-gray-300 rounded-md p-2"
      >
        <option value="All Status">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      <select
        name="categories"
        id="categories"
        className="col-span-12 md:col-span-2 border border-gray-300 rounded-md p-2"
      >
        <option value="All Categories">All Categories</option>
        <option value="Road">Road</option>
        <option value="Water">Water</option>
        <option value="Electricity">Electricity</option>
        <option value="Garbage">Garbage</option>
      </select>

      <select
        name="radius"
        id="radius"
        className="col-span-12 md:col-span-2 border border-gray-300 rounded-md p-2"
      >
        <option value="Radius">Radius</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
    </div>
  );
};

export default AdminInput;
