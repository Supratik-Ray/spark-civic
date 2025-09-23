import { useState, useEffect } from "react";

export default function useGeoLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setLocation([position.coords.latitude, position.coords.longitude]),
        (error) => console.error("Error getting location: " + error.message)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  return location;
}
