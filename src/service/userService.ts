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

import {
  AddUserContactQuery,
  UpdateUserContactQuery,
} from 'src/interface/UserContact';

class UserService {
  private baseUrl = import.meta.env.VITE_BACKEND_URL;

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

  public async addUserContact(query: AddUserContactQuery): Promise<Response> {
    const { aadhaar_number, name, relation, phone_number, email, status, priority, latitude, longitude } = query;
  
    try {
      const response = await fetch(`${this.baseUrl}/add_user_contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          aadhaar_number,
          name,
          relation,
          phone_number,
          email,
          status,
          priority,
          latitude,
          longitude,
        }),
      });
  
      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }
  
      return response;
    } catch (error) {
      console.error('Error adding user contact:', error);
      throw new Error('An error occurred while adding the user contact.');
    }
  }

  public async updateUserContact(query: UpdateUserContactQuery): Promise<{ success: boolean; message: string }> {
    const { old_phone_number, aadhaar_number, name, relation, new_phone_number, email, status, priority, latitude, longitude } = query;
  
    try {
      const response = await fetch(`${this.baseUrl}/update_user_contact`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          
          phone_number: old_phone_number,
          aadhaar_number,
          name,
          relation,
          new_phone_number,
          email,
          status,
          priority,
          latitude,
          longitude,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || `Error: ${response.statusText}`);
      }
  
      return { success: true, message: data.message };
    } catch (error) {
      console.error('Error updating user contact:', error);
      return { success: false, message: 'An error occurred while updating the user contact.' };
    }
  }

  public async deleteUserContact(phoneNumber: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/delete_user_contact`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return { success: true, message: data.message };
      }
  
      return { success: false, message: data.message };
  
    } catch (error) {
      console.error('Error deleting user contact:', error);
      return { success: false, message: 'An error occurred while deleting the user contact.' };
    }
  }

  public async getAllUserContacts(): Promise<Response> {
    try {
      const response = await fetch(`${this.baseUrl}/get_all_user_contacts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }
  
      return response;
    } catch (error) {
      console.error('Error fetching user contacts:', error);
      throw new Error('An error occurred while fetching the user contacts.');
    }
  }
  
}

export const userService = new UserService();
