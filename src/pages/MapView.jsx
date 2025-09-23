import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { fetchIssues } from "../supabase/api/issues";
import FilterControl from "../components/FilterControl";

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
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    async function getIssues() {
      const results = await fetchIssues();
      if (results.success) {
        console.log(results.data);
        setIssues(results.data);
      }
    }

    getIssues();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  return (
    <div className="h-screen w-full relative">
      <MapContainer
        center={userLocation || [26.70592, 88.4506624]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {issues.map((issue) => {
          return (
            <Marker
              key={issue.id}
              position={[issue.coordinates[1], issue.coordinates[0]]}
              className="bg-red-500"
              icon={createIcon(issue.category_id)}
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
          <div className="flex flex-col gap-2">
            <h3 className="md:text-lg font-semibold">Filters:</h3>
            <div className="flex flex-col md:flex-row gap-2">
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
                name="distance"
                id="distance"
                className="col-span-12 md:col-span-2 border border-gray-300 rounded-md p-2"
              >
                <option value="distance">Distance</option>
                <option value={1000}>1 km</option>
                <option value={5000}>5 km</option>
                <option value={10000}>10 km</option>
              </select>
            </div>
          </div>
        </FilterControl>
      </MapContainer>
    </div>
  );
};

export default MapView;
