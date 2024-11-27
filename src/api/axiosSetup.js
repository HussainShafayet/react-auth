import axios from 'axios';
import store from '../store/store'
import {logout, refreshToken, updateAccessToken} from '../features/userSlice';


const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com', // replace with your API base URL
});

// Request Interceptor - Add access token to headers if available
axiosInstance.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
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
        console.log('Refreshing access token...');
        const result = await store.dispatch(refreshToken({expiresInMins:1,refreshToken: store.getState().auth.refreshToken}));
        console.log('new access result', result);

        const newAccessToken = result.data.accessToken;
        
        // Update the Redux state with the new access token
        store.dispatch(updateAccessToken(newAccessToken));

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log out the user
        store.dispatch(logout());
        //window.location.href = '/signin'; // Redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
