import React, { useState, useEffect, useRef } from 'react';
import { TextField, Autocomplete, CircularProgress, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useLoadScript } from '@react-google-maps/api';

type LocationOption = {
  place_id: string;
  description: string;
  lat?: number;
  lng?: number;
};

type LocationAutocompleteProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onLocationSelect: (lat: number, lng: number) => void;
  placeholder?: string;
  disabled?: boolean;
  onClear?: () => void;
};

const GOOGLE_MAPS_LIBRARIES: (
  'places' | 'drawing' | 'geometry' | 'visualization'
)[] = ['places'];

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  label,
  value,
  onChange,
  onLocationSelect,
  placeholder,
  disabled = false,
  onClear,
}) => {
  const [options, setOptions] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  useEffect(() => {
    if (isLoaded && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      geocoder.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  const searchPlaces = async (query: string) => {
    if (!autocompleteService.current || !query.trim()) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const request: google.maps.places.AutocompletionRequest = {
        input: query,
        types: ['establishment', 'geocode'],
        componentRestrictions: { country: 'IN' }, // Restrict to India
      };

      const response = await new Promise<google.maps.places.AutocompletePrediction[]>((resolve, reject) => {
        autocompleteService.current!.getPlacePredictions(request, (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            resolve(predictions);
          } else {
            reject(new Error(`Places API error: ${status}`));
          }
        });
      });

      const locationOptions: LocationOption[] = response.map((prediction: google.maps.places.AutocompletePrediction) => ({
        place_id: prediction.place_id,
        description: prediction.description,
      }));

      setOptions(locationOptions);
    } catch (error) {
      console.error('Error fetching places:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.SyntheticEvent, newInputValue: string) => {
    setInputValue(newInputValue);
    onChange(newInputValue);
    
    // Debounce the search
    const timeoutId = setTimeout(() => {
      searchPlaces(newInputValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleOptionSelect = async (event: React.SyntheticEvent, selectedValue: string | LocationOption | null) => {
    if (!selectedValue || typeof selectedValue === 'string' || !geocoder.current) return;

    setLoading(true);
    try {
      const request: google.maps.GeocoderRequest = {
        placeId: selectedValue.place_id,
      };

      const response = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.current!.geocode(request, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results) {
            resolve(results);
          } else {
            reject(new Error(`Geocoding error: ${status}`));
          }
        });
      });

      if (response.length > 0) {
        const location = response[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        
        // Update the option with coordinates
        const updatedOption = { ...selectedValue, lat, lng };
        setOptions(prev => prev.map(opt => 
          opt.place_id === selectedValue.place_id ? updatedOption : opt
        ));
        
        // Call the callback with coordinates
        onLocationSelect(lat, lng);
        onChange(selectedValue.description);
      }
    } catch (error) {
      console.error('Error geocoding place:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <Autocomplete
        fullWidth
        options={options}
        isOptionEqualToValue={(option, compareValue) => option.place_id === compareValue.place_id}
        getOptionLabel={(option) => {
          if (typeof option === 'string') return option;
          return option.description;
        }}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleOptionSelect}
        loading={loading}
        disabled={disabled || !isLoaded}
        sx={{ width: '100%' }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant="outlined"
            fullWidth
            sx={{ width: '100%' }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {onClear && (
                    <IconButton onClick={onClear} size="small">
                      <ClearIcon />
                    </IconButton>
                  )}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return (
            <li key={key} {...rest}>
              <div>
                <div style={{ fontWeight: 'bold' }}>
                  {option.description.split(',')[0]}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(0, 0, 0, 0.6)' }}>
                  {option.description.split(',').slice(1).join(',')}
                </div>
              </div>
            </li>
          );
        }}
        filterOptions={(x) => x} // Disable built-in filtering
        noOptionsText="No locations found"
      />
    </div>
  );
};

export default LocationAutocomplete; 