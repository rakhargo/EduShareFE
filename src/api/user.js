import axiosInstance from './axios';

export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post('/user/login', { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await axiosInstance.post('/user/register', { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};