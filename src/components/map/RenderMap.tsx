import { useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript,
} from '@react-google-maps/api';
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

const RenderMap = () => {
  const [center, setCenter] = useState<LatLng>({ lat: 12.9981, lng: 77.6829 });
  const source: LatLng = { lat: 12.9881, lng: 77.6829 };
  const [travelModes, setTravelModes] = useState<TravelModesType | null>(null);
  const [sourceName, setSourceName] = useState<string>('');
  const destination: LatLng = { lat: 12.9692, lng: 77.7499 };
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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
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
    }
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleCarNumberChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCarNumber(e.target.value);

  const handleSubmitCarNumber = () => {
    if (carNumber) {
      setIsJourneyStarted(true);
      setIsModalOpen(false);
    }
  };

  const handleSubmitCarNumberSkip = () => {
    setIsJourneyStarted(true);
    setIsModalOpen(false);
  };

  const handleRatingSubmit = () => {
    console.log(`Journey ended with a rating of: ${rating}`);
    setIsRatingModalOpen(false);
  };

  const handleTravelTypeChange = (type: google.maps.TravelMode) => setTravelType(type);

  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSourceName(e.target.value);

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDestinationName(e.target.value);

  const clearSourceInput = () => setSourceName('');
  const clearDestInput = () => setDestinationName('');

  const handleSafetyTimerChange = (event: SelectChangeEvent<number>) =>
    setSafetyTimer(event.target.value as number);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
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
    const intervalId = setInterval(fetchLocation, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (directionsResponse) setRoutes(directionsResponse.routes);
  }, [directionsResponse]);

  // const handleRouteClick = (route: any, index: number) => {
  //   setSelectedRouteIndex(index);
  //   const distance = route.legs[0].distance.text;
  //   const duration = route.legs[0].duration.text;
  //   const summary = route.summary;
  //   setSelectedRouteSummary({ summary, distance, duration });
  // };

  const handleDirectionsCallback = (response: any, status: string) => {
    if (status === 'OK' && response) setDirectionsResponse(response);
  };

  const handleAlertModalClose = () => setIsAlertModalOpen(false);

  const handleDirectionsRendererReady = (
    directionsRenderer: google.maps.DirectionsRenderer,
    route: any,
    index: number
  ) => {
    const polyline = directionsRenderer.getDirections()?.routes[0].overview_path;
    console.log(polyline);
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
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
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
            {/* </div> */}

            {/* <div className="flex-1"> */}
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
            // className="h-full w-full rounded-lg"
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

            {source && destination && isLoaded && travelType && (
              <DirectionsService
                options={{
                  origin: source,
                  destination,
                  travelMode: travelType,
                  provideRouteAlternatives: true,
                }}
                callback={handleDirectionsCallback}
              />
            )}

            {routes &&
              routes.map((route, index) => (
                <DirectionsRenderer
                  key={index}
                  directions={{ ...directionsResponse, routes: [route] }}
                  options={{
                    polylineOptions: {
                      strokeColor: routeColors[index % routeColors.length],
                      strokeOpacity: 0.7,
                      strokeWeight: 5,
                      clickable: true,
                    },
                    preserveViewport: true,
                  }}
                  onLoad={(directionsRenderer) =>
                    handleDirectionsRendererReady(directionsRenderer, route, index)
                  }
                />
              ))}
          </GoogleMap>

          {selectedRouteSummary && (
            <div className="absolute top-2 left-2 p-2 bg-white rounded-md">
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
