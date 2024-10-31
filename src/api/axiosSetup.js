import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/', // replace with your API base URL
});

export default axiosInstance;
