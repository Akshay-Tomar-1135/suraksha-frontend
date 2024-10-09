import { useState, useCallback, useEffect, lazy } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import Button from 'src/components/Button';
import { userTypeKey, UserTypes } from 'src/_mock/enums';
import { useAppDispatch, useAppSelector } from 'src/store/reduxHooks';
import { setUserType } from 'src/store/features/userConfig/userConfigSlice';
import OTPVerification from './OTPVerification';
// import WomanSignUpForm from './womanSignUpForm';
import SignInForm from './signInForm';
import PoliceSignUpForm from './policeSignUpForm';

const WomanSignUpForm = lazy(()=> import('./womanSignUpForm'));

// ----------------------------------------------------------------------

export function AuthView() {
  const router = useRouter();
  const { userType } = useAppSelector((state) => state.user);
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [sendOTPLoading, setSendOTPLoading] = useState<boolean>(false);

  const [OTPVerifyLoading, setOTPVerifyLoading] = useState<boolean>(false);
  const [OTPVerifying, setOTPVerifying] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem(userTypeKey);
    if (!user && !userType) return;
    if (!userType) dispatch(setUserType(user as UserTypes));
  }, [userType, dispatch]);

  const handleSendOTP = () => {
    setSendOTPLoading(true);
    setTimeout(() => {
      setOTPVerifying(true);
      setSendOTPLoading(false);
    }, 2000);
  };

  const handleOTPVerification = useCallback(
    (otp: string) => {
      setOTPVerifyLoading(true);
      setTimeout(() => {
        setOTPVerifyLoading(false);
        router.push('/dashboard');
      }, 2000);
    },
    [router]
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">{isSignIn ? 'Sign In' : 'Sign Up'}</Typography>
        <Typography variant="body2" color="text.secondary">
          {OTPVerifying?'Edit your details':`${isSignIn ? 'Don’t h' : 'H'}ave an account?`}
          <Button
            text={OTPVerifying?'Here':(isSignIn ? 'Get Started' : 'Sign In')}
            className="text-[#1877F2] font-semibold ml-1 hover:underline"
            onButtonClick={() => OTPVerifying?setOTPVerifying(false):setIsSignIn(!isSignIn)}
          />
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        {OTPVerifying ? (
          <OTPVerification isLoading={OTPVerifyLoading} verifyOTP={handleOTPVerification} />
        ) : (
          <>
            {isSignIn ? (
              <SignInForm isLoading={sendOTPLoading} handleSubmit={handleSendOTP} />
            ) : userType === UserTypes.police ? (
              <PoliceSignUpForm isLoading={sendOTPLoading} handleSubmit={handleSendOTP} />
            ) : (
              <WomanSignUpForm isLoading={sendOTPLoading} handleSubmit={handleSendOTP} />
            )}
          </>
        )}
      </Box>
      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>

      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box>
    </>
  );
}
