import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript,
} from '@react-google-maps/api';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { FaWalking, FaCar, FaMapMarkerAlt, FaAmbulance, FaFireExtinguisher, FaExclamationTriangle, FaPhoneAlt, FaLifeRing } from "react-icons/fa";  // Icons
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const mapStyles = {
  width: '100%',
  height: '80vh',
  border: '2px solid black',
  position: 'relative',
};

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const travelModes = {
  driving: { icon: FaCar, color: "blue" },
  walking: { icon: FaWalking, color: "green" },
};

const RenderMap = () => {
  const [center, setCenter] = useState({
    latitude: 12.9981,
    longitude: 77.6829, 
  });
  const [source, setSource] = useState({ lat: 12.9981, lng: 77.6829 });
  const [destination, setDestination] = useState({ lat: 12.9692, lng: 77.7499 });
  const [travelType, setTravelType] = useState("DRIVING");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [carNumber, setCarNumber] = useState('');
  const [isJourneyStarted, setIsJourneyStarted] = useState(false); // To track button state
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility

  const startJourney = () => {
    if (!isJourneyStarted) {
      // Open the modal if the journey is being started
      setIsModalOpen(true);
    } else {
      // If ending the journey
      setCarNumber("");
      setIsJourneyStarted(false); // End journey
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Handle car number change
  const handleCarNumberChange = (e) => {
    setCarNumber(e.target.value);
  };

  const handleSubmitCarNumber = () => {
    if (carNumber) {
      setIsJourneyStarted(true); // Start the journey
      setIsModalOpen(false); // Close modal
    }
  };

  const handleTravelTypeChange = (type) => setTravelType(type.toUpperCase());

  const handleSourceChange = (e) => setSource(e.target.value);
  const handleDestinationChange = (e) => setDestination(e.target.value);
  const clearSourceInput = () => setSource("");
  const clearDestInput = () => setDestination("");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AlzaSybYgTc-Rii_b6CLjj_EVv2XrjoZRtGzLpc'
  });

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ latitude, longitude });
          setLocation({ latitude, longitude });
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Fetch location every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchLocation, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (directionsResponse) {
      setRoutes(directionsResponse.routes);
    }
  }, [directionsResponse]);

  const handleDirectionsCallback = (response, status) => {
    if (status === 'OK' && response) {
      setDirectionsResponse(response);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <>
      <div className="box" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div className="input-container" style={{ display: 'flex', justifyContent: 'space-between', width: '92%' }}>
          <div className="field" style={{ flex: 1, marginRight: '10px' }}>
            <TextField
              label="Source (lng, lat)"
              variant="outlined"
              value={`${source.lng}, ${source.lat}`}
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
              value={`${destination.lng}, ${destination.lat}`}
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

          <div style={{ display: "flex", gap: "15px", alignItems: 'center' }}>
            {Object.keys(travelModes).map((mode) => {
              const Icon = travelModes[mode].icon;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleTravelTypeChange(mode)}
                  style={{
                    backgroundColor: travelType === mode.toUpperCase() ? travelModes[mode].color : "gray",
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

          {/* Start/End Journey Button */}
          <div style={{ marginLeft: '15px' }}>
            <button
              type="button"
              onClick={startJourney}
              style={{
                backgroundColor: isJourneyStarted ? 'red' : 'green', // Green if not started, red if started
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderTop: '2px',
                borderRadius: '5px',  // Make it a rectangle
                cursor: 'pointer',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Add shadow
                transition: 'background-color 0.3s ease',  // Smooth transition
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = isJourneyStarted ? '#cc0000' : '#00cc00';  // Darker on hover
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = isJourneyStarted ? 'red' : 'green';  // Original color
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = isJourneyStarted ? '#cc0000' : '#00cc00';  // Same as onMouseOver for focus
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = isJourneyStarted ? 'red' : 'green';  // Same as onMouseOut for blur
              }}
            >
              {isJourneyStarted ? 'End Journey' : 'Start Journey'}
            </button>
          </div>

        </div>

        <Dialog open={isModalOpen} onClose={handleModalClose} fullWidth maxWidth="sm" PaperProps={{ style: { height: '400px' } }}>
          <DialogTitle style={{textAlign: 'center'}}>Journey details</DialogTitle>
          <DialogContent style={{ height: '300px' }}>
            <TextField
              label="Car Number"
              variant="outlined"
              value={carNumber}
              onChange={handleCarNumberChange}
              fullWidth
              style={{marginTop: '5px'}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmitCarNumber} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div style={mapStyles}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={3}
          center={source || center}
          options={{
            gestureHandling: 'greedy',
            zoomControl: true,
          }}
        >
          {location.latitude !== null && location.longitude !== null && (
            <Marker
              position={{ lat: location.latitude, lng: location.longitude }}
              label="You are here!"
            />
          )}
          <Marker position={center} label="S" />
          <Marker position={destination} label="D" />

          {source && destination && isLoaded && (
            <DirectionsService
              options={{
                origin: source,
                destination, 
                travelMode: window.google.maps.TravelMode[travelType],
                provideRouteAlternatives: true,
              }}
              callback={handleDirectionsCallback}
            />
          )}

          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
              routeIndex={selectedRouteIndex}
              preserveViewport={false}
            />
          )}

          {routes.length > 0 && (
            <div className="route-selection">
              <h2>Available Routes:</h2>
              <ul>
                {routes.map((route, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => setSelectedRouteIndex(index)}
                    >
                      {route.summary}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </GoogleMap>

        {/* Spherical buttons on the right side */}
        <div style={{ position: 'absolute', right: '15px', top: '40%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
          type='button'
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '18px',
            }}
          >
            {/* <FaCar /> */}
            <FaAmbulance/>
          </button>

          <button
           type='button'
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#28a745',
              color: 'white',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '18px',
            }}
          >
            {/* <FaWalking /> */}
            {/* <FaExclamationTriangle/>
           */}
          <FaPhoneAlt/>
          </button>

          <button
           type='button'
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#ffc107',
              color: 'white',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '18px',
            }}
          >
            <FaExclamationTriangle/>
          </button>
        </div>
      </div>
    </>
  );
};

export default RenderMap;
