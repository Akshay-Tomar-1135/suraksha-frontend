import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userTypeKey, UserTypes } from 'src/_mock';
import { userService } from 'src/service/userService';
import { WomanInfo, PoliceInfo, UserDetailQuery } from '../../../interface/UserConfig';

type InitialState = {
  userType: UserTypes | null;
  isfetchingUser: boolean;
  isUserFetchError: boolean;
  userInfo: WomanInfo | PoliceInfo | null;
};

const initialState: InitialState = {
  userType: null,
  userInfo: null,
  isfetchingUser: false,
  isUserFetchError: false,
};

export const fetchUser = createAsyncThunk('fetchUser', (query: UserDetailQuery) =>
  userService.getUserDetails(query)
);

const userConfigSlice = createSlice({
  name: 'userConfig',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<UserTypes | null>) => {
      state.userType = action.payload;
      if (action.payload) localStorage.setItem(userTypeKey, String(action.payload));
      else localStorage.removeItem(userTypeKey);
    },
    setFname(state, action: PayloadAction<string>) {
      if (state.userInfo) {
        state.userInfo.fname = action.payload;
      } else {
        state.userInfo = { fname: action.payload } as WomanInfo | PoliceInfo;
      }
    },
    setLname(state, action: PayloadAction<string | undefined>) {
      if (state.userInfo) {
        state.userInfo.lname = action.payload;
      } else {
        state.userInfo = { lname: action.payload } as WomanInfo | PoliceInfo;
      }
    },
    setAadhaarNumber(state, action: PayloadAction<string>) {
      if (state.userInfo) {
        (state.userInfo as WomanInfo).adhaar_number = action.payload;
      } else {
        state.userInfo = { adhaar_number: action.payload } as WomanInfo;
      }
    },
    setState(state, action: PayloadAction<string>) {
      if (state.userInfo) {
        (state.userInfo as WomanInfo).state = action.payload;
      } else {
        state.userInfo = { state: action.payload } as WomanInfo;
      }
    },
    setAgeGroup(state, action: PayloadAction<string>) {
      if (state.userInfo) {
        (state.userInfo as WomanInfo).age_group = action.payload;
      } else {
        state.userInfo = { age_group: action.payload } as WomanInfo;
      }
    },
    setGender(state, action: PayloadAction<string>) {
      if (state.userInfo) {
        (state.userInfo as WomanInfo).gender = action.payload;
      } else {
        state.userInfo = { gender: action.payload } as WomanInfo;
      }
    },
    setPhoneNumber(state, action: PayloadAction<string>) {
      if (state.userInfo) {
        state.userInfo.phone_number = action.payload;
      } else {
        state.userInfo = { phone_number: action.payload } as WomanInfo | PoliceInfo;
      }
    },
    setEmail(state, action: PayloadAction<string>) {
      if (state.userInfo) {
        state.userInfo.email = action.payload;
      } else {
        state.userInfo = { email: action.payload } as WomanInfo | PoliceInfo;
      }
    },
    setPoliceId(state, action: PayloadAction<string>) {
      if (state.userInfo) {
        (state.userInfo as PoliceInfo).police_id = action.payload;
      } else {
        state.userInfo = { police_id: action.payload } as PoliceInfo;
      }
    },
    setPoliceStationAddress(state, action: PayloadAction<string>) {
      if (state.userInfo) {
        (state.userInfo as PoliceInfo).police_station_address = action.payload;
      } else {
        state.userInfo = { police_station_address: action.payload } as PoliceInfo;
      }
    },
    setPoliceIdCard(state, action: PayloadAction<string | undefined>) {
      if (state.userInfo) {
        (state.userInfo as PoliceInfo).id_card = action.payload;
      } else {
        state.userInfo = { id_card: action.payload } as PoliceInfo;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isfetchingUser = false;
      state.isUserFetchError = false;
      const { name, ...restPayload } = action.payload.data;
      state.userInfo = {
        fname: name.split(' ')[0].trim(),
        lname: name.split(' ').slice(1).join(' ').trim(),
        ...restPayload,
      } as WomanInfo | PoliceInfo;

      console.log('userInfo ----', state.userInfo);
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isfetchingUser = false;
      state.isUserFetchError = true;
      console.log('rejected response ---', action);
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isfetchingUser = true;
      state.isUserFetchError = false;
    });
  },
});

export default userConfigSlice.reducer;
export const { setUserType } = userConfigSlice.actions;
