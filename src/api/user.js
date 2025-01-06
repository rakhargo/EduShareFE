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

export const loginResponse = (response) => {
  const { id, access_token, token_type } = response;

  // Save the id and access_token in sessionStorage
  sessionStorage.setItem('userId', id);
  sessionStorage.setItem('accessToken', access_token);
  sessionStorage.setItem('tokenType', token_type);

  console.log('ID and access token saved to sessionStorage.');
};