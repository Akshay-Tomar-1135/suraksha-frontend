import { useState, useCallback, useEffect, lazy } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import Button from 'src/components/Button';
import { Severity, userTypeKey, UserTypes } from 'src/_mock';
import { useAppDispatch, useAppSelector } from 'src/store/reduxHooks';
import { fetchUser, setUserType } from 'src/store/features/userConfig/userConfigSlice';
import { userService } from 'src/service/userService';
import { AuthResponse, PoliceInfo, WomanInfo } from 'src/interface/UserConfig';
import { useToast } from 'src/components/snackBar/ToastContext';

const WomanSignUpForm = lazy(() => import('./womanSignUpForm'));
const SignInForm = lazy(() => import('./signInForm'));
const OTPVerification = lazy(() => import('./OTPVerification'));
const PoliceSignUpForm = lazy(() => import('./policeSignUpForm'));

// ----------------------------------------------------------------------

export function AuthView() {
  const router = useRouter();
  const { userType, userInfo, isUserFetchError, isfetchingUser } = useAppSelector(
    (state) => state.user
  );
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [sendOTPLoading, setSendOTPLoading] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const { showToast } = useToast();
  const [OTPVerifyLoading, setOTPVerifyLoading] = useState<boolean>(false);
  const [OTPVerifying, setOTPVerifying] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem(userTypeKey);
    if (!user && !userType) return;
    if (!userType) dispatch(setUserType(user as UserTypes));
  }, [userType, dispatch]);

  useEffect(() => {
    if (!userInfo || isUserFetchError || isfetchingUser || !userType) return;
    router.push('/dashboard');
  }, [router, userInfo, isUserFetchError, isfetchingUser, userType]);

  const handleSignUpSendOTP = useCallback(
    async (payload: WomanInfo | PoliceInfo) => {
      try {
        setSendOTPLoading(true);
        setPhoneNumber(payload.phone_number);
        let response: AuthResponse;
        if (userType === UserTypes.woman)
          response = await userService.womanSignup(payload as WomanInfo);
        else if (userType === UserTypes.police)
          response = await userService.policeSignup(payload as PoliceInfo);
        else throw new Error('Error: Invalid user type');
        setOTPVerifying(true);
        showToast(response.message);
      } catch (error) {
        console.error(error);
        showToast(error.message, { severity: Severity.error });
      } finally {
        setSendOTPLoading(false);
      }
    },
    [showToast, userType]
  );

  const handleSignInSendOTP = useCallback(
    async (phone_number: string) => {
      if (!userType) return;
      try {
        setSendOTPLoading(true);
        setPhoneNumber(phone_number);
        const response: AuthResponse = await userService.signIn({ userType, phone_number });
        setOTPVerifying(true);
        showToast(response.message);
      } catch (error) {
        console.error(error);
        showToast(error.message, { severity: Severity.error });
      } finally {
        setSendOTPLoading(false);
      }
    },
    [showToast, userType]
  );

  const handleOTPVerification = useCallback(
    async (otp: string) => {
      if (!userType || !phoneNumber) return;
      try {
        setOTPVerifyLoading(true);
        const response: AuthResponse = await userService.OTPVerification({
          isLogin: isSignIn,
          userType,
          phone_number: phoneNumber,
          otp,
        });
        showToast(response.message);
        dispatch(
          fetchUser({
            userType,
            phone_number: phoneNumber,
          })
        );
      } catch (error) {
        console.error(error);
        showToast(error.message, { severity: Severity.error });
      } finally {
        setOTPVerifyLoading(false);
      }
    },
    [isSignIn, phoneNumber, userType, showToast, dispatch]
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">{isSignIn ? 'Sign In' : 'Sign Up'}</Typography>
        <Typography variant="body2" color="text.secondary">
          {OTPVerifying ? 'Edit your details' : `${isSignIn ? 'Don’t h' : 'H'}ave an account?`}
          <Button
            text={OTPVerifying ? 'Here' : isSignIn ? 'Get Started' : 'Sign In'}
            className="text-[#1877F2] font-semibold ml-1 hover:underline"
            onButtonClick={() => (OTPVerifying ? setOTPVerifying(false) : setIsSignIn(!isSignIn))}
          />
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        {OTPVerifying ? (
          <OTPVerification isLoading={OTPVerifyLoading} verifyOTP={handleOTPVerification} />
        ) : (
          <>
            {isSignIn ? (
              <SignInForm isLoading={sendOTPLoading} handleSubmit={handleSignInSendOTP} />
            ) : userType === UserTypes.police ? (
              <PoliceSignUpForm isLoading={sendOTPLoading} handleSubmit={handleSignUpSendOTP} />
            ) : (
              <WomanSignUpForm isLoading={sendOTPLoading} handleSubmit={handleSignUpSendOTP} />
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
