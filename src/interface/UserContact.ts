export interface AddUserContactQuery {
  aadhaar_number: number;
  name: string;
  relation: string;
  phone_number: string;
  email: string;
  status: string;
  priority: number;
  latitude: number;
  longitude: number;
}

export interface UpdateUserContactQuery {
  old_phone_number: string;
  aadhaar_number: number;
  name: string;
  relation: string;
  new_phone_number: string;
  email: string;
  status: string;
  priority: number;
  latitude: number;
  longitude: number;
}

export type UserProps = {
  id: string;
  name: string;
  phoneNum: string;
  status: string;
  relation: string;
  avatarUrl?: string;
  email: string;
  latitude: number;
  longitude: number;
  priority: number;
};

export interface UserContact {
  name: string;
  relation: string;
  phone_number: string;
  email: string;
  status: string;
  priority: number;
}