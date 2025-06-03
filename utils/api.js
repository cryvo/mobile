// File: mobile-app/utils/api.js

import axios from 'axios';
import Constants from 'expo-constants';

const API = axios.create({
  baseURL: Constants.manifest.extra.API_URL, // e.g. https://api.cryvo.io/api/v1
  timeout: 5000,
});

API.interceptors.request.use(
  async (config) => {
    // attach Bearer token if you have auth stored in AsyncStorage
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
