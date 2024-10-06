import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript,
  Autocomplete,
} from '@react-google-maps/api';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import {
  FaWalking,
  FaCar,
  FaAmbulance,
  FaExclamationTriangle,
  FaPhoneAlt,
  FaSmile,
  FaFrown,
  FaMeh,
  FaGrinBeam,
  FaAngry,
} from 'react-icons/fa'; // Icons
import {
  DialogActions,
  Button,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'; // Added Rating component
import { Label } from '../label';

const smileys = [
  { label: 'Worse', icon: <FaAngry size={50} color="red" /> },
  { label: 'Bad', icon: <FaFrown size={50} color="orange" /> },
  { label: 'Meh', icon: <FaMeh size={50} color="gray" /> },
  { label: 'Good', icon: <FaSmile size={50} color="green" /> },
  { label: 'Great', icon: <FaGrinBeam size={50} color="blue" /> },
];

const CustomSmileyRating = ({ rating, setRating }) => {
  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setRating(index + 1);
    }
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.1)'; // Slightly larger on hover
  };

  const handleMouseLeave = (e, index) => {
    e.currentTarget.style.transform = index + 1 === rating ? 'scale(1.2)' : 'scale(1)';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
      {smileys.map((smiley, index) => (
        <div
          key={index}
          role="button"
          tabIndex={0}
          onClick={() => setRating(index + 1)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            transform: index + 1 === rating ? 'scale(1.3)' : 'scale(1)', // Adjusted size for selected
            transition: 'transform 0.3s ease', // Smooth transition
          }}
          aria-label={smiley.label}
        >
          <div
            style={{
              fontSize: '50px',
              color: index + 1 === rating ? 'black' : 'gray',
              transform: 'inherit', // Inherit the transform for hover and selected states
            }}
            onMouseEnter={handleMouseEnter} // Handle hover
            onMouseLeave={(e) => handleMouseLeave(e, index)} // Reset to selected or default size
          >
            {smiley.icon}
          </div>
          <p
            style={{
              marginTop: '10px',
              fontSize: '14px',
              color: index + 1 === rating ? 'black' : 'gray',
            }}
          >
            {smiley.label}
          </p>
        </div>
      ))}
    </div>
  );
};

CustomSmileyRating.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
};

const mapStyles = {
  width: '100%',
  height: '75vh',
  border: '0.5px solid black',
  position: 'relative',
  borderRadius:"10px",
  backgroundColor: 'white',
};

const mapContainerStyle = {
  height: '100%',
  width: '100%',
  borderRadius:"10px",
};

const travelModes = {
  driving: { icon: FaCar, color: 'blue' },
  walking: { icon: FaWalking, color: 'green' },
};

const RenderMap = () => {
  const [center, setCenter] = useState({
    latitude: 12.9981,
    longitude: 77.6829,
  });
  const [source, setSource] = useState({ lat: 12.9881, lng: 77.6829 });
  const [destination, setDestination] = useState({ lat: 12.9692, lng: 77.7499 });
  const [destinationName, setDestinationName] = useState("");
  const [travelType, setTravelType] = useState('DRIVING');
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [carNumber, setCarNumber] = useState('');
  const [isJourneyStarted, setIsJourneyStarted] = useState(false); // To track button state
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false); // To control rating modal visibility
  const [rating, setRating] = useState(0); // For storing the user's rating
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false); // State for alert modal
  const selected = routes[selectedRouteIndex];
  const leg = selected?.legs[0];
  const routeColors = ['red', 'green', 'blue', 'yellow', 'orange']; // Add more colors if needed
  const [selectedRouteSummary, setSelectedRouteSummary] = useState(null); // To display the clicked route summary

  const startJourney = () => {
    if (!isJourneyStarted) {
      // Open the modal if the journey is being started
      setIsModalOpen(true);
    } else {
      // If ending the journey, open rating modal
      setCarNumber('');
      setIsJourneyStarted(false); // End journey
      setIsRatingModalOpen(true); // Open rating modal
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
  const handleSubmitCarNumberSkip = () => {
    // if (carNumber) {
    setIsJourneyStarted(true); // Start the journey
    setIsModalOpen(false); // Close modal
    // }
  };

  const handleRatingSubmit = () => {
    console.log(`Journey ended with a rating of: ${rating}`);
    setIsRatingModalOpen(false); // Close rating modal after submission
  };

  const handleTravelTypeChange = (type) => setTravelType(type.toUpperCase());

  const handleSourceChange = (e) => setSourceName(e.target.value);
  const handleDestinationChange = (e) => setDestinationName(e.target.value);
  const clearSourceInput = () => setSourceName('');
  const clearDestInput = () => setDestinationName('');

  const [safetyTimer, setSafetyTimer] = useState('');

  const handleSafetyTimerChange = (event) => {
    setSafetyTimer(event.target.value);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AlzaSybYgTc-Rii_b6CLjj_EVv2XrjoZRtGzLpc',
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
      console.error('Geolocation is not supported by this browser.');
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

  // Handle route clicks and set the selected route summary
  const handleRouteClick = (route, index) => {
    setSelectedRouteIndex(index);
    
    // Extract details from the first leg of the route (start to end)
    const distance = route.legs[0].distance.text;  // Distance in a human-readable format
    const duration = route.legs[0].duration.text;  // Duration in a human-readable format
    const summary = route.summary;  // Route summary
    
    // Set a detailed summary with distance and duration
    setSelectedRouteSummary({
      summary,
      distance,
      duration,
    });
  };

  const handleDirectionsCallback = (response, status) => {
    if (status === 'OK' && response) {
      setDirectionsResponse(response);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  // Handle alert modal close
  const handleAlertModalClose = () => {
    setIsAlertModalOpen(false);
  };

  // Render alert modal
  const renderAlertModal = () => (
    <Dialog open={isAlertModalOpen} onClose={handleAlertModalClose} fullWidth maxWidth="sm">
      <DialogTitle style={{ textAlign: 'center' }}>Send an Alert Call</DialogTitle>

      <DialogContent
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: '150px',
        }}
      >
        {['Home', 'Hospital', 'Police', 'Fire Station'].map((place, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // flexBasis: '33%', // Ensures two buttons per row
              marginBottom: '15px', // Space between rows
            }}
          >
            <button
              type="button"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'green',
                color: 'white',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '18px',
                transition: 'transform 0.3s ease', // Smooth transition for scaling
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.2)'; // Enlarge the button on hover
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)'; // Return to normal size when hover ends
              }}
              onBlur={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
              onFocus={(e) => {
                e.target.style.transform = 'scale(1.2)';
              }}
            >
              <FaPhoneAlt />
            </button>
            <span style={{ marginTop: '5px', fontSize: '14px', textAlign: 'center' }}>{place}</span>
          </div>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleAlertModalClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
    <div  style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection:"column",
          marginBottom: '20px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '17px',
        }}>
      <div
        className="box"
        style={{
          display: 'flex',
          justifyContent:"space-between",
          alignItems: 'center',
          marginBottom: '20px',
          width:"90%",
          // border:"2px solid black",
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '17px',
        }}
      >
        <div
          className="input-container"
          style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}
        >
          <div className="field" style={{ flex: 1, marginRight: '10px' }}>
            <TextField
              label="Source (lng, lat)"
              variant="outlined"
              value={sourceName}
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
              value={destinationName}
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

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {Object.keys(travelModes).map((mode) => {
              const Icon = travelModes[mode].icon;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleTravelTypeChange(mode)}
                  style={{
                    backgroundColor:
                      travelType === mode.toUpperCase() ? travelModes[mode].color : 'gray',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                >
                  <Icon />
                </button>
              );
            })}
          </div>

          {/* Start/End Journey Button */}
          <div style={{ marginLeft: '25px' }}>
            <button
              type="button"
              onClick={startJourney}
              style={{
                backgroundColor: isJourneyStarted ? 'red' : 'black', // Black if not started, red if started
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow
                transition: 'background-color 0.3s ease', // Smooth transition
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = isJourneyStarted ? '#cc0000' : '#333333'; // Darker red if started, dark gray if not started
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = isJourneyStarted ? 'red' : 'black'; // Original color
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = isJourneyStarted ? '#cc0000' : '#333333'; // Same as onMouseOver for focus
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = isJourneyStarted ? 'red' : 'black'; // Same as onMouseOut for blur
              }}
            >
              {isJourneyStarted ? 'End Journey' : 'Start Journey'}
            </button>
          </div>
        </div>

        {/* Journey details modal */}
        <Dialog
          open={isModalOpen}
          onClose={handleModalClose}
          fullWidth
          maxWidth="sm"
          PaperProps={{ style: { height: '400px' } }}
        >
          <DialogTitle style={{ textAlign: 'center' }}>Journey details</DialogTitle>
          <DialogContent style={{ height: '300px' }}>
            <TextField
              label="Car Number"
              variant="outlined"
              value={carNumber}
              onChange={handleCarNumberChange}
              fullWidth
              style={{ marginTop: '10px' }}
            />
            <TextField
              label="Car Model"
              variant="outlined"
              value={carNumber}
              onChange={handleCarNumberChange}
              fullWidth
              style={{ marginTop: '5px' }}
            />
            <TextField
              label="Car Color"
              variant="outlined"
              value={carNumber}
              onChange={handleCarNumberChange}
              fullWidth
              style={{ marginTop: '5px' }}
            />
            <FormControl fullWidth style={{ marginTop: '15px' }}>
              <InputLabel id="safety-timer-label">Check Safety Timer</InputLabel>
              <Select
                labelId="safety-timer-label"
                value={safetyTimer}
                onChange={handleSafetyTimerChange}
                variant="outlined"
                label="Check Safety Timer"
              >
                <MenuItem value={0}>No Reminder</MenuItem>
                <MenuItem value={5}>Every 5 minutes</MenuItem>
                <MenuItem value={10}>Every 10 minutes</MenuItem>
                <MenuItem value={15}>Every 15 minutes</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmitCarNumberSkip} color="error">
              Skip
            </Button>
            <Button onClick={handleSubmitCarNumber} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {/* Rating modal after journey ends */}
        <Dialog
          open={isRatingModalOpen}
          onClose={() => setIsRatingModalOpen(false)}
          PaperProps={{ style: { height: '300px', width: '500px' } }}
        >
          <DialogTitle style={{ textAlign: 'center' }}>Rate your journey</DialogTitle>
          <DialogContent
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '300px',
            }}
          >
            <CustomSmileyRating rating={rating} setRating={setRating} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsRatingModalOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleRatingSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div style={mapStyles}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
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

        {/* Map through routes and render all of them */}
        {routes &&
          routes.map((route, index) => (
            <DirectionsRenderer
              key={index}
              directions={{ ...directionsResponse, routes: [route] }} // Render individual route
              options={{
                polylineOptions: {
                  strokeColor: routeColors[index % routeColors.length], // Use distinct color for each route
                  strokeOpacity: 0.7,
                  strokeWeight: 5,
                  clickable: true, // Enable clicking on the route polyline
                },
                preserveViewport: true, // Keep the current map view
              }}
              onClick={() => handleRouteClick(route, index)} // Handle click on the route
            />
          ))}
      </GoogleMap>

        {selectedRouteSummary && (
        <div style={{ position: 'absolute', top: 10, left: 10, padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
          <h4>Selected Route Summary</h4>
          <p><strong>Summary:</strong> {selectedRouteSummary.summary}</p>
          <p><strong>Distance:</strong> {selectedRouteSummary.distance}</p>
          <p><strong>Duration:</strong> {selectedRouteSummary.duration}</p>
        </div>
      )}

        <div
          style={{
            position: 'absolute',
            right: '15px',
            top: '40%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <button
            type="button"
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
            <FaAmbulance />
          </button>

          <button
            type="button"
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
            <FaPhoneAlt />
          </button>

          <button
            onClick={() => setIsAlertModalOpen(true)}
            type="button"
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
            <FaExclamationTriangle />
          </button>
        </div>
        {renderAlertModal()}
      </div>
    </div>
    </>
  );
};

export default RenderMap;
