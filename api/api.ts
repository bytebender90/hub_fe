import axios from 'axios'
import { getCookie } from 'cookies-next';

const instance = axios.create({
  baseURL: "/",
  timeout: 10000,
})
instance.interceptors.request.use((config: any) => {
  var token: string | undefined | null = localStorage.getItem('token')
  if (!token) {
    token = getCookie('x-auth-cookie');
  }
  if (config.headers['Content-Type'] != 'multipart/form-data')
    config.headers['Content-Type'] = 'application/json'

  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

export default instance;