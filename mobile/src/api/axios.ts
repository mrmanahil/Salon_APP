import axios from 'axios';
import {url} from '../screens/General/General.screen';

function getUrl() {
  console.log(url);

  return url;
}

const axiosInstance = axios.create({
  baseURL: `${getUrl()}/api/v1`,
  headers: {
    'ngrok-skip-browser-warning': true,
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    config.baseURL = `${getUrl()}/api/v1`;
    return config;
  },
  error => Promise.reject(error),
);

export {axiosInstance};
