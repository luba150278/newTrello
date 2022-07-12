/* eslint-disable no-underscore-dangle */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import getErrorMessage from '../functions/getErrorMessage';
import getNotify from '../functions/notify';
import { headersConfig } from './header-config';

interface AuthResponse {
  token: string;
  result: string;
}
const $api = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: headersConfig,
});
$api.interceptors.request.use((config: AxiosRequestConfig) => {
  const configModify = config;
  if (configModify.headers && localStorage.getItem('token')) {
    configModify.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return configModify;
  }
  return configModify;
});

$api.interceptors.response.use(
  (config: AxiosResponse) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/login`, {
          withCredentials: true,
          headers: headersConfig,
        });
        localStorage.setItem('token', response.data.token);
        return await $api.request(originalRequest);
      } catch (e) {
        getNotify(getErrorMessage(e));
      }
    }
    throw error;
  }
);

export default $api;
