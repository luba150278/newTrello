import axios from 'axios';
import { api } from '../common/constans';

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : 'Bearer 123', // к этому мы ещё вернёмся как-нибудь потом
  },
});

// instance.interceptors.response.use((res) => res.data);

export default instance;
