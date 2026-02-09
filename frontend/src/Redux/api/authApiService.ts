import axios, { AxiosError } from "axios";

axios.defaults.withCredentials = true;

const API_URL = "https://eden-portfolio-4.onrender.com/api/user";

interface registerRequest {
  username: string;
  password: string;
  email: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface ApiErrorResponse {
  message: string;
}

interface loginRequest {
  email: string;
  password: string;
}

interface loginResponse {
  message: string;
  user: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };
}

interface registerResponse {
  message: string;
  user: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };
}

interface logoutResponse{
    message: string;
}

export const ApiRegister = async (
  data: registerRequest,
): Promise<registerResponse> => {
  try {
    const res = await axios.post(`${API_URL}/register`, data);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    throw err.response?.data || { message: "Registration failed" };
  }
};

export const ApiLogin = async (data: loginRequest): Promise<loginResponse> => {
  try {
    const res = await axios.post(`${API_URL}/login`, data);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    throw err.response?.data || { message: "Login failed" };
  }
};

export const ApiLogout = async (): Promise<logoutResponse> => {
  try {
    const res = await axios.get(`${API_URL}/logout`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    throw err.response?.data || { message: "Logout failed" };
  }
};

export const ApiCurrentProfile = async (): Promise<User> => {
  try {
    const res = await axios.get(`${API_URL}/profile`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiErrorResponse>;
    throw err.response?.data || { message: "Not authorized" };
  }
};
