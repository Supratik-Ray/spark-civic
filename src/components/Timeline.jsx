import React, { useState, useEffect } from "react";
import { getIssueTimeline } from "../supabase/api/issueTimeline";

const Timeline = ({ issueId }) => {
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      if (!issueId) {
        setError("Issue ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { success, data, error: fetchError } = await getIssueTimeline(issueId);

        if (success) {
          setTimelineEvents(data || []);
          setError(null);
        } else {
          setError(fetchError?.message || "Failed to fetch timeline");
        }
      } catch (err) {
        setError(err.message || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [issueId]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return dateString;
    }
  };

  const getEventProperty = (event, keys, fallback = "Unknown") => {
    for (const key of keys) {
      if (event[key] !== undefined && event[key] !== null && event[key] !== "") return event[key];
    }
    return fallback;
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading timeline...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-center my-6">
        {error}
      </div>
    );

  if (!timelineEvents.length)
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        No timeline events for this issue
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-8 text-center">Issue Timeline</h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 w-1 bg-gray-200 h-full"></div>

        {timelineEvents.map((event, index) => (
          <div key={event.id || index} className="relative mb-10 pl-12">
            {/* Circle */}
            <span className="absolute left-1.5 top-1 w-6 h-6 rounded-full bg-blue-500 ring-4 ring-white shadow-md"></span>

            {/* Event card */}
            <div className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-all duration-200">
              <p className="text-gray-800 font-medium text-md">
                {getEventProperty(event, ["event_description", "description", "action"], "No description")}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                By {getEventProperty(event, ["changed_by_name", "user_name", "author"], "Unknown")} •{" "}
                {formatDate(getEventProperty(event, ["changed_at", "created_at", "timestamp"]))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
