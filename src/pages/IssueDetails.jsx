import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchIssueById, updateIssue } from "../supabase/api/issues";
import DateOnly from "../components/IssueDetailsComponents";
import { IoPerson } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import LocationName from "../components/LocationName";
import CommentSystem from "../components/CommentSystem";
import Timeline from "../components/Timeline";
import { getCurrentUser } from "../supabase/api/auth";
import { useAuth } from "../hooks/useAuth";
import { fetchAdmins } from "../supabase/api/profile";
import { toast } from "react-toastify";

function IssueDetails() {
  const { id } = useParams();
  const { profile, session } = useAuth();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("");
  const [adminList, setAdminList] = useState([]);
  const [assignedAdmin, setAssignedAdmin] = useState("");

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    const getIssue = async () => {
      const { data } = await fetchIssueById(id);
      setIssue(data[0]);
      setLoading(false);
      const userRes = await getCurrentUser();
      setCurrentUser(userRes.user);
    };
    if (id) getIssue();
  }, [id]);

  useEffect(() => {
    async function getAdmins() {
      if (profile?.role !== "admin") return;

      const result = await fetchAdmins();
      if (result.success) {
        setAdminList(result.data);
      }
    }

    getAdmins();
  }, [profile?.role]);

  if (loading)
    return (
      <p className="text-center text-2xl font-semibold mt-10">Loading....</p>
    );
  if (!issue)
    return (
      <p className="text-center text-2xl font-semibold mt-10">
        No issue found..
      </p>
    );

  const category = {
    1: "⚡ Electricity",
    2: "🛣️ Road",
    3: "💧 Water",
    4: "🗑️ Garbage",
  };

  async function handleStatusUpdate() {
    const payload = { status, updatedBy: session.user.id };
    if (status === "in_progress") {
      if (!assignedAdmin) {
        alert("please select an admin to assign!");
        return;
      }
      payload.assignedTo = assignedAdmin;
    }

    const result = await updateIssue(id, payload);
    if (result.success) {
      toast.success("successfully updated status!");
    } else {
      toast.error("couldn't update the status!");
    }

    setStatus("");
    setAssignedAdmin("");
  }

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      {/* Main content + Timeline + Assign box */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
        {/* Main issue box */}
        <div className="flex-1 bg-white shadow-2xl rounded-2xl p-8">
          <button
            className="pb-2 hover:bg-blue-200 hover:text-blue-700 p-1 rounded-lg flex gap-3 items-center mb-5"
            onClick={goBack}
          >
            <FaArrowLeftLong className="pt-1" /> Go Back
          </button>

          {profile?.role === "admin" && (
            <div className="flex flex-col md:flex-row gap-2 md:gap-10 md:items-center mb-5">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Change Status</option>
                <option value="in_progress">In Progress</option>
                <option value="rejected">Rejected</option>
                <option value="resolved">Resolved</option>
              </select>

              {status === "in_progress" && (
                <select
                  value={assignedAdmin}
                  onChange={(e) => setAssignedAdmin(e.target.value)}
                >
                  <option value="">Select Admin</option>
                  {adminList.map((admin) => (
                    <option key={admin.id} value={admin.id}>
                      {admin.full_name}
                    </option>
                  ))}
                </select>
              )}
              {status && (
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer"
                  onClick={handleStatusUpdate}
                >
                  Change status
                </button>
              )}
            </div>
          )}

          <h1 className="font-semibold text-2xl mb-4">{issue.title}</h1>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="px-2 py-1 bg-amber-100 rounded-xl hover:bg-amber-200">
              {category[issue.category_id]}
            </div>
            <div className="px-2 py-1 bg-blue-700 rounded-xl text-white hover:bg-blue-800">
              {issue.status}
            </div>
            <div className="px-2 py-1 bg-gray-200 rounded-xl">
              {issue.ticket_no}
            </div>
          </div>

          <p className="text-gray-600 mb-5">{issue.description}</p>

          <hr></hr>

          <div className="my-3">
            <strong>Location:</strong>{" "}
            <LocationName coordinates={issue.coordinates} />
          </div>
          <p className="mb-5">
            <strong>Coordinates:</strong> {issue.coordinates[0]},{" "}
            {issue.coordinates[1]}
          </p>

          <div className="flex gap-5 mb-5 items-center">
            <DateOnly isoString={issue.created_at} />
            <div className="flex items-center gap-2">
              <IoPerson /> {issue.created_by_name}
            </div>
          </div>

          {issue.photos && issue.photos.length > 0 && (
            <div className="mb-5">
              <p className="mb-2 font-semibold">Attached Photo:</p>
              <img
                className="w-[250px] h-[150px] object-cover rounded-md"
                src={issue.photos[0]}
                alt="Issue"
              />
            </div>
          )}
        </div>

        {/* Right side: Timeline and Assigned box */}
        <div className="flex flex-col gap-6 w-full md:w-1/3">
          {/* Timeline */}
          <Timeline issueId={issue.id} />

          {/* Assign box */}
          {/* <div className="bg-white p-4 rounded-xl shadow-xl min-w-[250px] max-w-[350px] block mx-auto hover:shadow-2xl">
            <p className="font-semibold mb-2">Assigned to:</p>
            <div className="flex items-center gap-2">
              <IoPerson
                className={`p-1 rounded-full ${
                  issue.assignedTo
                    ? "text-green-700 bg-green-300"
                    : "text-blue-700 bg-blue-400"
                }`}
              />
              <p>{issue.assignedTo || "Not Assigned"}</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Comments below main content */}
      <div className="w-full max-w-6xl my-10">
        <CommentSystem issueId={issue.id} currentUser={currentUser} />
      </div>
    </div>
  );
}

export default IssueDetails;
