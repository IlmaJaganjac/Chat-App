import axios from 'axios';

// Create an instance of axios with custom configuration
export const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Change port if needed
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});


