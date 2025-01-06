import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Adjust base URL as needed
  headers: {
    'Content-Type': 'application/json', // Set the Content-Type for all requests
  },
});

export default axiosInstance;
