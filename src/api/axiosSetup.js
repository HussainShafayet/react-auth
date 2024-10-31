import axios from 'axios';
import store from '../store/store'
import {logout, updateAccessToken} from '../features/userSlice';


const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com', // replace with your API base URL
});

// Request Interceptor to Add Access Token to Headers
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor for Refreshing Access Token on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh the access token using the refresh token
        const response = await axios.post('/auth/refresh', null, {
          withCredentials: true, // Ensures the refresh token cookie is sent
        });

        const newAccessToken = response.data.access_token;
        
        // Update the Redux state with the new access token
        store.dispatch(updateAccessToken(newAccessToken));

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log out the user
        store.dispatch(logout());
        window.location.href = '/login'; // Redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
