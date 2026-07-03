export interface RegisterDto {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  password: string;
}

export interface LoginDto {
  mobile: string;
  password: string;
  deviceName: string;
  user_agent: string;
  ip_address: string;
}