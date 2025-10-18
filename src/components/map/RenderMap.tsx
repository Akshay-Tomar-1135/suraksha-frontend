import { useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript,
} from '@react-google-maps/api';
import { usePoliceLocation } from 'src/contexts/PoliceLocationContext';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { FaWalking, FaCar, FaAmbulance, FaExclamationTriangle, FaPhoneAlt } from 'react-icons/fa';
import {
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  SelectChangeEvent,
} from '@mui/material';
import CustomSmileyRating from './components/CustomSmileyRating';
import LocationAutocomplete from './components/LocationAutocomplete';

type LatLng = {
  lat: number;
  lng: number;
};

type RouteSummary = {
  summary: string;
  distance: string;
  duration: string;
};

type TravelModesType = {
  [key: string]: { icon: React.ElementType; color: string; travelType: google.maps.TravelMode };
};

const GOOGLE_MAPS_LIBRARIES: (
  'places' | 'drawing' | 'geometry' | 'visualization'
)[] = ['places'];

const mapContainerStyle = {
  height: '100%',
  width: '100%',
  borderRadius: '10px',
};

const RenderMap = () => {
  // const [center, setCenter] = useState<LatLng>({ lat: 12.9981, lng: 77.6829 });
  const [source, setSource] = useState<LatLng | null>(null);
  const [travelModes, setTravelModes] = useState<TravelModesType | null>(null);
  const [sourceName, setSourceName] = useState<string>('');
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [destinationName, setDestinationName] = useState<string>('');
  const [travelType, setTravelType] = useState<google.maps.TravelMode | null>(null);
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [routes, setRoutes] = useState<any[]>([]);
  // const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);
  const [carNumber, setCarNumber] = useState<string>('');
  const [isJourneyStarted, setIsJourneyStarted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const routeColors = ['red', 'green', 'blue', 'yellow', 'orange'];
  const [selectedRouteSummary, setSelectedRouteSummary] = useState<RouteSummary | null>(null);
  const [safetyTimer, setSafetyTimer] = useState<number>(-1);
  const [directionsRequested, setDirectionsRequested] = useState<boolean>(false);
  const [shouldShowDirections, setShouldShowDirections] = useState(false);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);
  const [showRouteSelector, setShowRouteSelector] = useState<boolean>(false);
  const { policeLocations } = usePoliceLocation();

  
  // Hard-coded markers with blue color
  const hardCodedMarkers: { position: LatLng; name: string }[] = [
    { position: { lat: 12.9716, lng: 77.5946 }, name: "Bangalore Palace" },
    { position: { lat: 12.9789, lng: 77.5917 }, name: "Cubbon Park" },
    { position: { lat: 12.9719, lng: 77.6412 }, name: "MG Road" },
    { position: { lat: 12.9855, lng: 77.7123 }, name: "Indiranagar" },
    { position: { lat: 12.9352, lng: 77.6245 }, name: "Jayanagar" },
  ];

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  useEffect(() => {
    if (isLoaded) {
      setTravelModes({
        driving: { icon: FaCar, color: '[#4169e1]', travelType: google.maps.TravelMode.DRIVING },
        walking: {
          icon: FaWalking,
          color: '[#32cd32]',
          travelType: google.maps.TravelMode.WALKING,
        },
      });
      setTravelType(google.maps.TravelMode.DRIVING);
    }
  }, [isLoaded]);

  const startJourney = () => {
    if (!isJourneyStarted) {
      setIsModalOpen(true);
    } else {
      setCarNumber('');
      setIsJourneyStarted(false);
      setIsRatingModalOpen(true);
      setShouldShowDirections(false); // Hide directions when journey ends
    }
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleCarNumberChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCarNumber(e.target.value);

  const handleSubmitCarNumber = () => {
    if (carNumber) {
      setIsJourneyStarted(true);
      setIsModalOpen(false);
      setShouldShowDirections(true); // Show directions when journey starts
    }
  };

  const handleSubmitCarNumberSkip = () => {
    setIsJourneyStarted(true);
    setIsModalOpen(false);
    setShouldShowDirections(true); // Show directions when journey starts
  };

  const handleRatingSubmit = () => {
    console.log(`Journey ended with a rating of: ${rating}`);
    setIsRatingModalOpen(false);
  };

  const handleTravelTypeChange = (type: google.maps.TravelMode) => {
    console.log('Travel type changed to:', type);
    setTravelType(type);
    setDirectionsRequested(false); // Reset to allow new directions request
    setDirectionsResponse(null); // Clear previous response
    setRoutes([]); // Clear previous routes
  };

  const handleSourceChange = (value: string) => {
    setSourceName(value);
  };

  const handleDestinationChange = (value: string) => {
    setDestinationName(value);
  };

  const handleSourceLocationSelect = (lat: number, lng: number) => {
    console.log('Source location selected:', { lat, lng });
    setSource({ lat, lng });
    setDirectionsRequested(false); // Reset to allow new directions request
    setDirectionsResponse(null); // Clear previous response
    setRoutes([]); // Clear previous routes
  };

  const handleDestinationLocationSelect = (lat: number, lng: number) => {
    console.log('Destination location selected:', { lat, lng });
    setDestination({ lat, lng });
    setDirectionsRequested(false); // Reset to allow new directions request
    setDirectionsResponse(null); // Clear previous response
    setRoutes([]); // Clear previous routes
  };

  const clearSourceInput = () => {
    setSourceName('');
    setSource(null);
    setDirectionsRequested(false);
    setDirectionsResponse(null);
    setRoutes([]);
    setShowRouteSelector(false);
    setSelectedRouteIndex(0);
    setSelectedRouteSummary(null);
  };
  
  const clearDestInput = () => {
    setDestinationName('');
    setDestination(null);
    setDirectionsRequested(false);
    setDirectionsResponse(null);
    setRoutes([]);
    setShowRouteSelector(false);
    setSelectedRouteIndex(0);
    setSelectedRouteSummary(null);
  };

  const handleSafetyTimerChange = (event: SelectChangeEvent<number>) =>
    setSafetyTimer(event.target.value as number);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Location received:', { latitude, longitude });
          // setCenter({ lat: latitude, lng: longitude });
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

  useEffect(() => {
    const intervalId = setInterval(fetchLocation, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (directionsResponse) {
      setRoutes(directionsResponse.routes);
      setShowRouteSelector(true);
      // Set the first route as selected by default
      if (directionsResponse.routes && directionsResponse.routes.length > 0) {
        const firstRoute = directionsResponse.routes[0];
        setSelectedRouteSummary({
          summary: firstRoute.summary,
          distance: firstRoute.legs[0]?.distance?.text || '',
          duration: firstRoute.legs[0]?.duration?.text || ''
        });
      }
    }
  }, [directionsResponse]);

  // const handleRouteClick = (route: any, index: number) => {
  //   setSelectedRouteIndex(index);
  //   const distance = route.legs[0].distance.text;
  //   const duration = route.legs[0].duration.text;
  //   const summary = route.summary;
  //   setSelectedRouteSummary({ summary, distance, duration });
  // };

  const handleDirectionsCallback = (response: any, status: string) => {
    console.log('Directions API called - Status:', status, 'Response:', response);
    if (status === 'OK' && response) setDirectionsResponse(response);
  };

  const handleRouteSelect = (index: number) => {
    setSelectedRouteIndex(index);
    if (routes && routes[index]) {
      const route = routes[index];
      setSelectedRouteSummary({
        summary: route.summary,
        distance: route.legs[0]?.distance?.text || '',
        duration: route.legs[0]?.duration?.text || ''
      });
    }
  };

  const getSafetyRating = (routeIndex: number) => {
    // Simulate different safety ratings for different routes
    const ratings = [1.2, 4.1, 2.8, 4.5, 1.9];
    return ratings[routeIndex] || 3.0;
  };

  const getSafetyColor = (safetyRating: number) => {
    if (safetyRating >= 4) return 'bg-green-500';
    if (safetyRating >= 2 && safetyRating <= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleAlertModalClose = () => setIsAlertModalOpen(false);

  const handleDirectionsRendererReady = (
    directionsRenderer: google.maps.DirectionsRenderer,
    route: any,
    index: number
  ) => {
    const polyline = directionsRenderer.getDirections()?.routes[0].overview_path;
    // console.log(polyline);
    // Add click listener to the polyline
    // google.maps.event.addListener(directionsRenderer.getDirections().routes[0].overview_polyline, 'click', () => {
    //   handleRouteClick(route, index);
    // });
  };

  const renderAlertModal = (
    <Dialog open={isAlertModalOpen} onClose={handleAlertModalClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-center">Send an Alert Call</DialogTitle>
      <DialogContent className="flex flex-wrap justify-evenly items-center h-[9.375rem]">
        {['Home', 'Hospital', 'Police', 'Fire Station'].map((place, index) => (
          <div key={index} className="flex flex-col items-center mb-4">
            <button
              type="button"
              className="w-[3.75rem] h-[3.75rem] bg-green-600 text-white rounded-full flex justify-center items-center text-lg transition-transform duration-300 ease-in-out transform hover:scale-110 focus:scale-110"
            >
              <FaPhoneAlt />
            </button>
            <span className="mt-1 text-sm text-center">{place}</span>
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

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <>
      <div className="flex flex-col items-center mb-5 bg-white p-5 rounded-lg">
        <div className="flex justify-between items-center mb-5 w-[100%] bg-white p-5 rounded-lg">
          <div className="flex flex-col md:flex-row justify-evenly w-full gap-4">
            <div className="flex flex-col lg:flex-row gap-4 flex-1 w-full">
              <div className="flex-1">
                <LocationAutocomplete
                  label="Source"
                  value={sourceName}
                  onChange={handleSourceChange}
                  onLocationSelect={handleSourceLocationSelect}
                  placeholder="Enter source location"
                  onClear={clearSourceInput}
                />
              </div>
              <div className="flex-1">
                <LocationAutocomplete
                  label="Destination"
                  value={destinationName}
                  onChange={handleDestinationChange}
                  onLocationSelect={handleDestinationLocationSelect}
                  placeholder="Enter destination location"
                  onClear={clearDestInput}
                />
              </div>
            </div>
            <div className="flex flex-row md:flex-col lg:flex-row gap-4 items-center justify-evenly">
              {travelModes && (
                <div className="flex gap-4 items-center">
                  {Object.keys(travelModes).map((mode) => {
                    const Icon = travelModes[mode].icon;
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => handleTravelTypeChange(travelModes[mode].travelType)}
                        className={`bg-${
                          travelType === travelModes[mode].travelType
                            ? travelModes[mode].color
                            : 'gray-500'
                        } text-white p-2 rounded-full`}
                      >
                        <Icon />
                      </button>
                    );
                  })}
                </div>
              )}

              <button
                type="button"
                onClick={startJourney}
                className={`${
                  isJourneyStarted ? 'bg-red-500 hover:bg-red-700' : 'bg-black hover:bg-gray-700'
                } text-white py-2 px-5 rounded-md shadow-md transition ease-in-out duration-300 flex-1 md:flex-none lg:flex-1`}
                disabled={!source || !destination}
              >
                {isJourneyStarted ? 'End Journey' : 'Start Journey'}
              </button>
            </div>
          </div>

          <Dialog open={isModalOpen} onClose={handleModalClose} fullWidth maxWidth="sm">
            <DialogTitle className="text-center">Journey details</DialogTitle>
            <DialogContent>
              <TextField
                label="Car Number"
                variant="outlined"
                value={carNumber}
                onChange={handleCarNumberChange}
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                label="Car Model"
                variant="outlined"
                value={carNumber}
                onChange={handleCarNumberChange}
                fullWidth
                sx={{ mt: 1 }}
              />
              <TextField
                label="Car Color"
                variant="outlined"
                value={carNumber}
                onChange={handleCarNumberChange}
                fullWidth
                sx={{ mt: 1 }}
              />
              <FormControl fullWidth sx={{ mt: 1 }}>
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

          <Dialog open={isRatingModalOpen} onClose={() => setIsRatingModalOpen(false)}>
            <DialogTitle className="text-center">Rate your journey</DialogTitle>
            <DialogContent className="flex flex-col items-center justify-center items-center">
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

        <div className="w-full h-[75vh] border border-black border-opacity-50 relative rounded-lg bg-white">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={
              source || 
              destination || 
              (location.latitude && location.longitude ? { lat: location.latitude, lng: location.longitude } : null) ||
              { lat: 12.9981, lng: 77.6829 }
            }
            zoom={source || destination ? 12 : 10}
            options={{
              gestureHandling: 'greedy',
              zoomControl: true,
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
            }}
          >
            {location.latitude !== null && location.longitude !== null && (
              <Marker
                position={{ lat: location.latitude, lng: location.longitude }}
                label="You are here!"
              />
            )}
            {source && (
              <Marker position={source} label="S" />
            )}
            {destination && (
              <Marker position={destination} label="D" />
            )}

            {shouldShowDirections && source && destination && isLoaded && travelType && !directionsRequested && (
              <DirectionsService
                options={{
                  origin: source,
                  destination,
                  travelMode: travelType,
                  provideRouteAlternatives: true,
                  avoidHighways: false,
                  avoidTolls: false,
                  avoidFerries: false,
                  optimizeWaypoints: false,
                }}
                callback={(response, status) => {
                  console.log('Directions API called - Status:', status, 'Response:', response);
                  setDirectionsRequested(true);
                  if (status === 'OK' && response) setDirectionsResponse(response);
                }}
              />
            )}

            {routes && routes.length > 0 && (
              <DirectionsRenderer
                directions={{ ...directionsResponse, routes: [routes[selectedRouteIndex]] }}
                options={{
                  polylineOptions: {
                    strokeColor: routeColors[selectedRouteIndex % routeColors.length],
                    strokeOpacity: 0.7,
                    strokeWeight: 5,
                    clickable: true,
                  },
                  preserveViewport: true,
                }}
                onLoad={(directionsRenderer) =>
                  handleDirectionsRendererReady(directionsRenderer, routes[selectedRouteIndex], selectedRouteIndex)
                }
              />
            )}

          {isLoaded && google && hardCodedMarkers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="blue"/>
                  </svg>
                `)}`,
                scaledSize: new google.maps.Size(24, 24),
                anchor: new google.maps.Point(12, 24),
              }}
            />
          ))}

          {isLoaded && google && hardCodedMarkers.map((marker, index) => (
            <Marker
              key={`label-${index}`}
              position={marker.position}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              
                    <text x="60" y="14" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="black" font-weight="bold">${marker.name}</text>
                  </svg>
                `)}`,
                scaledSize: new google.maps.Size(120, 20),
                anchor: new google.maps.Point(60, 0),
              }}
            />
          ))}

          {/* Police Location Markers */}
          {isLoaded && google && policeLocations.map((police) => (
            <Marker
              key={`police-${police.police_id}`}
              position={{ lat: police.latitude, lng: police.longitude }}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="red"/>
                  </svg>
                `)}`,
                scaledSize: new google.maps.Size(24, 24),
                anchor: new google.maps.Point(12, 24),
              }}
            />
          ))}

          {/* Police Location Labels */}
          {isLoaded && google && policeLocations.map((police) => (
            <Marker
              key={`police-label-${police.police_id}`}
              position={{ lat: police.latitude, lng: police.longitude }}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="60" y="14" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="black" font-weight="bold">${police.name}</text>
                  </svg>
                `)}`,
                scaledSize: new google.maps.Size(120, 20),
                anchor: new google.maps.Point(60, 0),
              }}
            />
          ))}

          </GoogleMap>

          {showRouteSelector && routes && routes.length > 0 && (
            <div className="absolute top-2 left-2 p-2 bg-white rounded-md shadow-lg max-w-md">
              <h4 className="font-bold mb-2">Available Routes ({routes.length})</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {routes.map((route, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-full text-left p-2 rounded border-2 transition-colors ${
                      selectedRouteIndex === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleRouteSelect(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleRouteSelect(index);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: routeColors[index % routeColors.length] }}
                        />
                        <span className="font-medium">Route {index + 1}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {route.legs[0]?.distance?.text} • {"Duration: "}{route.legs[0]?.duration?.text}
                      </div>
                    </div>
                                          <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs font-medium text-gray-700">Safety:</span>
                          <div className="flex items-center space-x-1">
                            {(() => {
                              const safetyRating = getSafetyRating(index);
                              return [1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= safetyRating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                  }`}
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                              ));
                            })()}
                          </div>
                          <span className="text-xs font-semibold text-gray-800 ml-1">
                            {getSafetyRating(index).toFixed(1)}
                          </span>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${getSafetyColor(getSafetyRating(index))}`} />
                      </div>
                    {route.summary && (
                      <div className="text-xs text-gray-500 mt-1">
                        {route.summary}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedRouteSummary && !showRouteSelector && (
            <div className="absolute top-2 left-2 p-2 bg-white rounded-md shadow-lg">
              <h4 className="font-bold">Selected Route Summary</h4>
              <p>
                <strong>Summary:</strong> {selectedRouteSummary.summary}
              </p>
              <p>
                <strong>Distance:</strong> {selectedRouteSummary.distance}
              </p>
              <p>
                <strong>Duration:</strong> {selectedRouteSummary.duration}
              </p>
            </div>
          )}

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3">
            <button
              type="button"
              className="w-14 h-14 bg-blue-600 text-white rounded-full flex justify-center items-center text-lg"
            >
              <FaAmbulance />
            </button>
            <button
              type="button"
              className="w-14 h-14 bg-green-600 text-white rounded-full flex justify-center items-center text-lg"
            >
              <FaPhoneAlt />
            </button>
            <button
              onClick={() => setIsAlertModalOpen(true)}
              type="button"
              className="w-14 h-14 bg-yellow-500 text-white rounded-full flex justify-center items-center text-lg"
            >
              <FaExclamationTriangle />
            </button>
          </div>
          {renderAlertModal}
        </div>
      </div>
    </>
  );
};

export default RenderMap;
