import React, { useEffect, useState } from "react";

// Function to fetch address from OpenCage API
const fetchAddress = async (lat, lng) => {
  const apiKey = "185bb3a2e7fd48738867678183c240a5"; // <-- Replace with your API key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted;
    }
    return "Address not found";
  } catch (error) {
    console.error(error);
    return "Error fetching address";
  }
};

const LocationName = ({ coordinates }) => {
  const [address, setAddress] = useState("Loading...");

  useEffect(() => {
    if (!coordinates || coordinates.length < 2) {
      setAddress("No coordinates provided");
      return;
    }

    const [lng, lat] = coordinates;

    const getAddress = async () => {
      const addr = await fetchAddress(lat, lng);
      setAddress(addr);
    };

    getAddress();
  }, [coordinates]);

  return <span>{address}</span>;
};

export default LocationName;
