import { Grid, InputAdornment, TextField, useMediaQuery } from '@mui/material';
import { useState } from 'react';

interface PhoneInputProps {
  countryCode: string;
  phoneNumber: string;
  setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formErrors: {
    countryCode?: string;
    phoneNumber?: string;
  };
}

export default function PhoneInput({
  countryCode,
  phoneNumber,
  setValue,
  formErrors,
}: PhoneInputProps) {
  const isSmallScreen = useMediaQuery('(max-width:390px)');
  const [isCodeFocused, setIsCodeFocused] = useState<boolean>(false);

  const handleCountryCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Only allow "+" followed by up to 3 digits (typical max for country codes)
    if (/^\d{0,3}$/.test(value)) {
      setValue(event);
    }
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (/^\d{0,10}$/.test(value)) {
      setValue(event);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
      {/* Country Code Input */}
      <Grid item xs={isSmallScreen ? 4 : 3}>
        <TextField
          label="Code"
          fullWidth
          name="countryCode"
          value={countryCode}
          onChange={handleCountryCodeChange}
          error={!!formErrors.countryCode}
          helperText={!!formErrors.countryCode || !!formErrors.phoneNumber ? ' ' : ''}
          onFocus={() => setIsCodeFocused(true)}
          onBlur={() => setIsCodeFocused(false)}
          InputProps={{
            startAdornment: (isCodeFocused || countryCode.length > 0) && (
              <InputAdornment position="start">+</InputAdornment>
            ),
          }}
          placeholder="91"
        />
      </Grid>

      {/* Phone Number Input */}
      <Grid item xs={isSmallScreen ? 8 : 9}>
        <TextField
          label="Phone Number"
          fullWidth
          name="phoneNumber"
          value={phoneNumber}
          error={!!formErrors.phoneNumber || !!formErrors.countryCode}
          helperText={formErrors.countryCode || formErrors.phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="1234567890"
        />
      </Grid>
    </Grid>
  );
}
