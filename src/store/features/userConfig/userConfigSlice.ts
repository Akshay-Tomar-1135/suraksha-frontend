import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userTypeKey, UserTypes } from 'src/_mock';
import { Email, PhoneNumber, Aadhaar } from '../../../interface/UserInfoTypes';

type InitialState = {
  userType: UserTypes | null;
  userFname: string;
  userLname?: string;
  aadhaarNumber: Aadhaar | null;
  phoneNumber: PhoneNumber | null;
  email: Email | null;
};

const initialState: InitialState = {
  userType: null,
  userFname: 'User',
  aadhaarNumber: null,
  phoneNumber: null,
  email: null,
};

const userConfigSlice = createSlice({
  name: 'userConfig',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<UserTypes | null>) => {
      state.userType = action.payload;
      if (action.payload) localStorage.setItem(userTypeKey, String(action.payload));
      else localStorage.removeItem(userTypeKey);
    },
    setUserFname: (state, action: PayloadAction<string>) => {
      state.userFname = action.payload;
    },
    setUserLname: (state, action: PayloadAction<string>) => {
      state.userLname = action.payload;
    },
    setAadhaarNumber: (state, action: PayloadAction<Aadhaar | null>) => {
      state.aadhaarNumber = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<PhoneNumber | null>) => {
      state.phoneNumber = action.payload;
    },
    setEmail: (state, action: PayloadAction<Email | null>) => {
      state.email = action.payload;
    },
  },
});

export default userConfigSlice.reducer;
export const {
  setUserType,
  setUserFname,
  setUserLname,
  setAadhaarNumber,
  setPhoneNumber,
  setEmail,
} = userConfigSlice.actions;
