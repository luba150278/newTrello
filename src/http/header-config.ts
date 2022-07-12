import { AxiosRequestHeaders } from 'axios';

export const headersConfig: AxiosRequestHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};
