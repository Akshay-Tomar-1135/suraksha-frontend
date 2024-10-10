import React, { useState, useEffect, useRef } from "react";
import MapLibreGlDirections, { LoadingIndicatorControl } from "@maplibre/maplibre-gl-directions";
import { FaWalking, FaCar } from "react-icons/fa";
import { Map as MapLibreMap, NavigationControl, Marker } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import "../../../OlaMapsWebSDK/style.css";
import './Styles.css';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

function RenderMap() {
  const [mapReady, setMapReady] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelType, setTravelType] = useState("driving");
  const [error, setError] = useState(null);
  const travelModes = {
    walking: { icon: FaWalking, color: "#4CAF50" },
    driving: { icon: FaCar, color: "#FF9800" },
  };

  // useEffect(() => {
  //   if (!mapReady) return;

  //   const map = new MapLibreMap({
  //     container: "central-map",
  //     center: [77.5353394, 16.03106],
  //     zoom: 10,
  //     style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
  //     transformRequest: (url, resourceType) => {
  //       url = url.replace("app.olamaps.io", "api.olamaps.io");
  //       if (url.includes("?")) {
  //         url = `${url}&api_key=SPFxc71FNc3LIdEcqyfDsg01EhUM41Nkq43BiRQf`;
  //       } else {
  //         url = `${url}?api_key=SPFxc71FNc3LIdEcqyfDsg01EhUM41Nkq43BiRQf`;
  //       }
  //       return { url, resourceType };
  //     },
  //   });

  //   const nav = new NavigationControl({
  //     visualizePitch: false,
  //     showCompass: true,
  //   });

  //   map.addControl(nav, "top-left");
  //   new Marker().setLngLat([77.5353394, 16.03106]).addTo(map);

  //   map.on("click", "symbols", (e) => {
  //     map.flyTo({
  //       center: e.features[0].geometry.coordinates,
  //     });
  //   });

  //   map.on("load", () => {
  //     const directions = new MapLibreGlDirections(map);
  //     directions.interactive = true;
  //     map.addControl(new LoadingIndicatorControl(directions));
  //     directions.setWaypoints([
  //       [77.5353394, 13.03106],
  //       [77.5353394, 15.03106],
  //     ]);

  //     // directions.removeWaypoint(0);
  //     // directions.addWaypoint([-73.8671258, 40.82234996], 0);
  //     // directions.clear();
  //   });

  // }, [mapReady]);



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


      directions.setWaypoints([
        [72.83028, 18.93016],  // Mumbai (Start)
        [88.37124, 22.57054],  // Kolkata (Midpoint)
        [77.11578, 28.643206], // Delhi (Destination)
      ]);



      // directions.removeWaypoint(0);
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
    setSource(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  // Clear source input
  const clearSourceInput = () => {
    setSource("");
  };

  const clearDestInput = () => {
    setDestination("");
  };

  return (
    <>
      <div className="box" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div className="input-container" style={{ display: 'flex', justifyContent: 'space-between', width: '92%' }}>
          <div className="field" style={{ flex: 1, marginRight: '10px' }}>
            <TextField
              label="Source (lng, lat)"
              variant="outlined"
              value={source}
              onChange={handleSourceChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton onClick={clearSourceInput}>
                    <ClearIcon />
                  </IconButton>
                ),
              }}
            />
          </div>

          <div className="field" style={{ flex: 1, marginRight: '20px' }}>
            <TextField
              label="Destination (lng, lat)"
              variant="outlined"
              value={destination}
              onChange={handleDestinationChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton onClick={clearDestInput}>
                    <ClearIcon />
                  </IconButton>
                ),
              }}
            />
          </div>

          {/* Travel Type Selection */}
          <div style={{ display: "flex", gap: "15px", alignItems: 'center' }}>
            {Object.keys(travelModes).map((mode) => {
              const Icon = travelModes[mode].icon;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleTravelTypeChange(mode)}
                  style={{
                    backgroundColor: travelType === mode ? travelModes[mode].color : "gray",
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
      </div>

      <div
        style={{
          width: "65vw",
          height: "68vh",
          borderRadius: "10px",
          overflow: "hidden",
          border: '1px solid black'
        }}
        ref={() => setMapReady(true)}
        id="central-map"
      />
    </>
  );
}

export default RenderMap;