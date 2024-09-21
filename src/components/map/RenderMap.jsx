import { useState ,useEffect} from "react"
import MapLibreGlDirections, {
  LoadingIndicatorControl,
} from "@maplibre/maplibre-gl-directions";
import { FaWalking, FaCar, FaBus } from "react-icons/fa";
// import {  } from "react";
import { Map as MapLibreMap, NavigationControl, Marker } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

function App() {
  const [mapReady, setMapReady] = useState(false);
  const [source, setSource] = useState([77.5353394, 13.03106]);
  const [destination, setDestination] = useState([77.5353394, 15.03106]);
  const [travelType, setTravelType] = useState("driving"); // default travel type

  const travelModes = {
    walking: { icon: FaWalking, color: "#4CAF50" },
    driving: { icon: FaCar, color: "#FF9800" },
    bus: { icon: FaBus, color: "#2196F3" },
  };

  useEffect(() => {
    if (!mapReady) return;

    const map = new MapLibreMap({
      container: "central-map",
      center: [0, 0],
      zoom: 0,
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      transformRequest: (url, resourceType) => {
        // Replace the wrong URL with the correct one
        url = url.replace("app.olamaps.io", "api.olamaps.io");

        // Add the API key to the URL based on existing parameters
        if (url.includes("?")) {
          url = `${url}&api_key=SPFxc71FNc3LIdEcqyfDsg01EhUM41Nkq43BiRQf`;
        } else {
          url = `${url}?api_key=SPFxc71FNc3LIdEcqyfDsg01EhUM41Nkq43BiRQf`;
        }
        return { url, resourceType };
      },
    });

    const nav = new NavigationControl({
      visualizePitch: false,
      showCompass: true,
    });

    map.addControl(nav, "top-left");

    new Marker().setLngLat([77.5353394, 16.03106]).addTo(map);

    map.on("click", "symbols", (e) => {
      map.flyTo({
        center: e.features[0].geometry.coordinates,
      });
    });

    map.on("load", () => {
      // Create an instance of the default class
      const directions = new MapLibreGlDirections(map);

      // Enable interactivity (if needed)
      directions.interactive = true;

      // Optionally add the standard loading-indicator control
      map.addControl(new LoadingIndicatorControl(directions));

      // Set the waypoints programmatically
      directions.setWaypoints([
        [77.5353394, 13.03106],
        [77.5353394, 15.03106],
      ]);

      // Remove waypoints
      directions.removeWaypoint(0);

      // Add waypoints
      directions.addWaypoint([-73.8671258, 40.82234996], 0);

      // Remove everything plugin-related from the map
      directions.clear();
    });
  }, [mapReady]);


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
        {/* Source and Destination Input */}
        <div>
          <label>Source (lng,lat):</label>
          <input
            type="text"
            value={source.join(",")}
            onChange={handleSourceChange}
            className="input-box" // Add class for styling
          />
        </div>

        <div>
          <label>Destination (lng,lat):</label>
          <input
            type="text"
            value={destination.join(",")}
            onChange={handleDestinationChange}
            className="input-box" // Add class for styling
          />
        </div>

        {/* Travel Type Selection */}
        <div style={{ display: "flex", gap: "10px" }}>
        {Object.keys(travelModes).map((mode) => {
  const Icon = travelModes[mode].icon;
  return (
    <button
      key={mode}
      type="button" // Specify the type here
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
        style={{ width: "70vw", height: "90vh", overflow: "hidden" }}
        ref={() => setMapReady(true)}
        id="central-map"
      />
    </>
  );
}

export default App;