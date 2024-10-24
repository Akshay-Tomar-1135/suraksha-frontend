import { UserTypes } from 'src/_mock';

export type CountryCode = `+${number}`;
export type Aadhaar =
  `${number}${number}${number}${number}${number}${number}${number}${number}${number}${number}${number}${number}`;
export type PhoneNumber =
  `${CountryCode}${number}${number}${number}${number}${number}${number}${number}${number}${number}${number}`;
export type Email = `${string}@${string}.${string}`;

export interface WomanInfo {
  user_id: string;
  fname: string;
  lname?: string;
  adhaar_number: string;
  state: string;
  age_group: string;
  gender: string;
  phone_number: string;
  email: string;
}

export interface WomanDetailResponse {
  status: string;
  data: {
    user_id: string;
    name: string;
    adhaar_number: string;
    state: string;
    age_group: string;
    gender: string;
    phone_number: string;
    email: string;
  };
}

export interface PoliceInfo {
  user_id: string;
  fname: string;
  lname?: string;
  police_id: string;
  police_station_address: string;
  id_card?: string;
  phone_number: string;
  email: string;
}

export interface PoliceDetailResponse {
  status: string;
  data: {
    user_id: string;
    name: string;
    police_id: string;
    police_station_address: string;
    id_card?: string;
    phone_number: string;
    email: string;
  };
}

export interface UserDetailQuery {
  userType?: UserTypes;
  phone_number: string;
}

export interface ErrorResponse {
  message: string;
}

export interface AuthResponse {
  message: string;
}

export interface OTPVerificationQuery {
  isLogin?: boolean;
  userType: UserTypes;
  phone_number: string;
  otp: string;
}

export interface SignInQuery {
  userType: UserTypes;
  phone_number: string;
}
