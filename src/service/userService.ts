import {
  ErrorResponse,
  OTPVerificationQuery,
  PoliceDetailResponse,
  PoliceInfo,
  AuthResponse,
  UserDetailQuery,
  WomanDetailResponse,
  WomanInfo,
  SignInQuery,
} from 'src/interface/UserConfig';

class UserService {
  private baseUrl = 'http://localhost:8000'; // process.env.VITE_BACKEND_URL;

  public async getUserDetails(
    query: UserDetailQuery
  ): Promise<WomanDetailResponse | PoliceDetailResponse> {
    const { userType, phone_number } = query;

    if (!userType) throw new Error('Error: User type not defined');

    const response = await fetch(`${this.baseUrl}/${userType}_details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({ phone_number }),
    });

    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.message || `Error: ${response.statusText}`);
    }

    const res = await response.json();
    return res;
  }

  public async womanSignup(query: WomanInfo): Promise<AuthResponse> {
    const { fname, lname, ...restPayload } = query;

    const response = await fetch(`${this.baseUrl}/user_signup_generate_otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        name: fname + (lname ?? ''),
        ...restPayload,
      }),
    });

    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.message || `Error: ${response.statusText}`);
    }

    const res = await response.json();
    return res;
  }

  public async policeSignup(query: PoliceInfo): Promise<AuthResponse> {
    const { fname, lname, ...restPayload } = query;

    const response = await fetch(`${this.baseUrl}/police_signup_generate_otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        name: fname + (lname ?? ''),
        ...restPayload,
      }),
    });

    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.message || `Error: ${response.statusText}`);
    }

    const res = await response.json();
    return res;
  }

  public async OTPVerification(query: OTPVerificationQuery): Promise<AuthResponse> {
    const { isLogin, userType, ...OTPVerificationPayload } = query;

    const response = await fetch(
      `${this.baseUrl}/${userType}_${isLogin ? 'signin' : 'signup'}_verify_otp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          ...OTPVerificationPayload,
        }),
      }
    );

    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.message || `Error: ${response.statusText}`);
    }

    const res = await response.json();
    return res;
  }

  public async signIn(query: SignInQuery): Promise<AuthResponse> {
    const { userType, ...signInPayload } = query;
    const response = await fetch(`${this.baseUrl}/${userType}_login_send_otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        ...signInPayload,
      }),
    });

    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.message || `Error: ${response.statusText}`);
    }

    const res = await response.json();
    return res;
  }
}

export const userService = new UserService();
