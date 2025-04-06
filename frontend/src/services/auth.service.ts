import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface LoginResponse {
  access_token: string;
  user: {
    _id: string;
    email: string;
  };
}

export const login = async (
  email: string,
  password: string
): Promise<{ accessToken: string; user: any }> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email, password });
  return {
    accessToken: response.data.access_token,
    user: {
      id: response.data.user._id,
      email: response.data.user.email,
    },
  };
};

export const register = async (email: string, password: string): Promise<void> => {
  await axios.post(`${API_URL}/auth/register`, { email, password });
};

export const logout = (): void => {};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
