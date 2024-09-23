import React, { useState, useEffect, useRef } from "react";
import { FaWalking, FaCar, FaBus } from "react-icons/fa";
import MapLibreGlDirections, {
  LoadingIndicatorControl,
} from "@maplibre/maplibre-gl-directions";
import { Map as MapLibreMap, NavigationControl, Marker } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

function RenderMap() {
  const [source, setSource] = useState([77.5353394, 13.03106]);
  const [destination, setDestination] = useState([77.5353394, 15.03106]);
  const [error, setError] = useState(null);
  const [travelType, setTravelType] = useState("driving");

  const travelModes = {
    walking: { icon: FaWalking, color: "#4CAF50" },
    driving: { icon: FaCar, color: "#FF9800" },
    bus: { icon: FaBus, color: "#2196F3" },
  };

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const mapRef = useRef(null); // Use ref for map instance
  const markerRef = useRef(null); // Ref for marker

  // Function to fetch the location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Fetch location every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchLocation, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Initialize map only once
  useEffect(() => {
    if (mapRef.current) return; // Prevent re-initializing

    const mapInstance = new MapLibreMap({
      container: "central-map",
      center: [77.5353394, 16.03106], // Fallback to a default location
      zoom: 4,
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      transformRequest: (url, resourceType) => {
        url = url.replace("app.olamaps.io", "api.olamaps.io");
        if (url.includes("?")) {
          url = `${url}&api_key=SPFxc71FNc3LIdEcqyfDsg01EhUM41Nkq43BiRQf`;
        } else {
          url = `${url}?api_key=SPFxc71FNc3LIdEcqyfDsg01EhUM41Nkq43BiRQf`;
        }
        return { url, resourceType };
      },
    });

    mapRef.current = mapInstance; // Store map instance in ref

    const nav = new NavigationControl({
      visualizePitch: false,
      showCompass: true,
    });

    mapInstance.addControl(nav, "top-left");

    // Initialize marker with default location
    markerRef.current = new Marker()
      .setLngLat([77.5353394, 16.03106]) // Default location
      .addTo(mapInstance);

    mapInstance.on("click", "symbols", (e) => {
      mapInstance.flyTo({
        center: e.features[0].geometry.coordinates,
      });
    });

    mapInstance.on("load", () => {
      const directions = new MapLibreGlDirections(mapInstance);
      directions.interactive = true;
      mapInstance.addControl(new LoadingIndicatorControl(directions));
      directions.removeWaypoint(0);
    });
  }, []);

  // Update marker position when location changes
  useEffect(() => {
    if (location.latitude && location.longitude && markerRef.current) {
      markerRef.current.setLngLat([location.longitude, location.latitude]);
    }
  }, [location]);

  const handleTravelTypeChange = (type) => {
    setTravelType(type);
  };

  const handleSourceChange = (e) => {
    const [lng, lat] = e.target.value.split(",");
    setSource([parseFloat(lng), parseFloat(lat)]);
  };

  const handleDestinationChange = (e) => {
    const [lng, lat] = e.target.value.split(",");
    setDestination([parseFloat(lng), parseFloat(lat)]);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label>Source (lng,lat):</label>
          <input
            type="text"
            value={source.join(",")}
            onChange={handleSourceChange}
            className="input-box"
          />
        </div>

        <div>
          <label>Destination (lng,lat):</label>
          <input
            type="text"
            value={destination.join(",")}
            onChange={handleDestinationChange}
            className="input-box"
          />
        </div>

        {/* Travel Type Selection */}
        <div style={{ display: "flex", gap: "10px" }}>
          {Object.keys(travelModes).map((mode) => {
            const Icon = travelModes[mode].icon;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => handleTravelTypeChange(mode)}
                style={{
                  backgroundColor:
                    travelType === mode ? travelModes[mode].color : "gray",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                <Icon />
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{ width: "90vw", height: "90vh", overflow: "hidden" }}
        id="central-map"
      />

      {error && <p>Error: {error}</p>}
    </>
  );
}

export default RenderMap;