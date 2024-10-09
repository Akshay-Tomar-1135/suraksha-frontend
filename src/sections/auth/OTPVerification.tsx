import { Grid, TextField, useMediaQuery } from '@mui/material';
import { useState, useRef } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

interface OTPVerificationProps {
  isLoading: boolean;
  verifyOTP: (otp: string) => void;
}

export default function OTPVerification({ isLoading, verifyOTP }: OTPVerificationProps) {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isSmallScreen = useMediaQuery('(max-width:345px)');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { value } = e.target;

    // Allow only single digit numbers
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to next input
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <Grid container spacing={1} justifyContent="center" sx={{ mb: 3 }}>
        {otp.map((digit, index) => (
          <Grid item key={index} xs={isSmallScreen ? 3 : 2}>
            <TextField
              variant="outlined"
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center' },
              }}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputRef={(el) => {
                inputRefs.current[index] = el;
              }}
            />
          </Grid>
        ))}
      </Grid>
      <LoadingButton
        fullWidth
        loading={isLoading}
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        disabled={otp.join('').length < 6}
        onClick={() => verifyOTP(otp.join(''))}
      >
        Verify OTP
      </LoadingButton>
    </>
  );
}
