import { useState, useEffect } from "react";
import MapLibreGlDirections, {
  LoadingIndicatorControl,
} from "@maplibre/maplibre-gl-directions";
import { FaWalking, FaCar } from "react-icons/fa";
import { Map as MapLibreMap, NavigationControl, Marker } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import "../../../OlaMapsWebSDK/style.css";
import './Styles.css'; // Ensure this path is correct
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

function RenderMap() {
  const [mapReady, setMapReady] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelType, setTravelType] = useState("driving");

  const travelModes = {
    walking: { icon: FaWalking, color: "#4CAF50" },
    driving: { icon: FaCar, color: "#FF9800" },
  };

  useEffect(() => {
    if (!mapReady) return;

    const map = new MapLibreMap({
      container: "central-map",
      center: [77.5353394, 16.03106],
      zoom: 10,
      style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
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

    const nav = new NavigationControl({
      visualizePitch: false,
      showCompass: true,
    });

    map.addControl(nav, "top-left");
    new Marker().setLngLat([77.5353394, 16.03106]).addTo(map);

    map.on("load", () => {
      const directions = new MapLibreGlDirections(map);
      directions.interactive = true;
      map.addControl(new LoadingIndicatorControl(directions));
      directions.setWaypoints([
        [77.5353394, 13.03106],
        [77.5353394, 15.03106],
      ]);

      directions.removeWaypoint(0);
      directions.addWaypoint([-73.8671258, 40.82234996], 0);
      directions.clear();
    });
  }, [mapReady]);

  const handleTravelTypeChange = (type) => {
    setTravelType(type);
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

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
          <div className="field" style={{ flex: 1, marginRight: '10px', position: 'relative' }}>
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
              style={{ borderRadius: '10px', backgroundColor: '#fff' }}
            />
          </div>

          <div className="field" style={{ flex: 1, marginRight: '20px', position: 'relative' }}>
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
              style={{ borderRadius: '10px', backgroundColor: '#fff' }}
            />
          </div>

          {/* Travel Type Selection */}
          <div style={{ display: "flex", gap: "10px", alignItems: 'center' }}>
            {Object.keys(travelModes).map((mode) => {
              const Icon = travelModes[mode].icon;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleTravelTypeChange(mode)}
                  style={{
                    backgroundColor: travelType === mode ? travelModes[mode].color : "#ccc",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = travelModes[mode].color; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = travelType === mode ? travelModes[mode].color : "#ccc"; }}
                >
                  <Icon size={20} />
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
          borderRadius: "20px",
          overflow: "hidden",
          border: '3px solid #333',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          position: 'relative',
        }}
        ref={() => setMapReady(true)}
        id="central-map"
      />
    </>
  );
}

export default RenderMap;
