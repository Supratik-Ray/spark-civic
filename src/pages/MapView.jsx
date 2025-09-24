import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { fetchIssues } from "../supabase/api/issues";
import FilterControl from "../components/FilterControl";
import useGeoLocation from "../hooks/useGeolocation";
import { useNavigate } from "react-router-dom";

const markerColors = {
  1: "orange",
  2: "black",
  3: "blue",
  4: "green",
};

const issueCategories = {
  1: { icon: "⚡", name: "Electricity" },
  2: { icon: "🛣️", name: "Road" },
  3: { icon: "💧", name: "Water" },
  4: { icon: "🗑️", name: "Waste Management" },
};

const createIcon = (category) => {
  const color = markerColors[category] || markerColors.default;
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};
const MapView = () => {
  const [issues, setIssues] = useState([]);
  const [issueFilters, setIssueFilters] = useState({
    lon: null,
    lat: null,
    radius: null,
    status: null,
    category_id: null,
  });
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  const location = useGeoLocation();

  useEffect(() => {
    if (location) {
      const lat = location[0];
      const lon = location[1];
      setIssueFilters((prev) => ({
        ...prev,
        lat,
        lon,
      }));
      setUserLocation([lat, lon]);
    }
  }, [location]);

  useEffect(() => {
    async function getIssues() {
      const results = await fetchIssues(issueFilters);
      if (results.success) {
        setIssues(results.data);
      }
    }

    getIssues();
  }, [issueFilters]);

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setIssueFilters((prev) => ({ ...prev, [name]: value || null }));
  }

  return (
    <div className="h-screen w-full relative ">
      {!userLocation ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-600">Loading map...</p>
        </div>
      ) : (
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          />
          {issues.map((issue) => {
            return (
              <Marker
                key={issue.id}
                position={[issue.coordinates[1], issue.coordinates[0]]}
                className="bg-red-500"
                icon={createIcon(issue.category_id)}
                eventHandlers={{ click: () => navigate(`/issues/${issue.id}`) }}
              >
                <Tooltip>
                  <div className="p-5 border-l-5 border-blue-600 bg-white space-y-2">
                    <h3 className="font-bold text-lg ">{issue.title}</h3>
                    <p className="font-semibold text-md">
                      Status: {issue.status}
                    </p>
                    <p className="font-semibold text-md">
                      category: {issueCategories[issue.category_id].icon}
                      {issueCategories[issue.category_id].name}
                    </p>
                  </div>
                </Tooltip>
              </Marker>
            );
          })}
          <FilterControl>
            <div className="flex flex-col mt-5 lg:mt-0 gap-2">
              <h3 className="md:text-lg font-semibold">Filters:</h3>
              <div className="flex flex-col md:flex-row gap-2">
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
                  <option value="">Distance</option>
                  <option value={1000}>1 km</option>
                  <option value={5000}>5 km</option>
                  <option value={10000}>10 km</option>
                </select>
              </div>
            </div>
          </FilterControl>
        </MapContainer>
      )}
    </div>
  );
};

export default MapView;
