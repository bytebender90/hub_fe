import api from './api';
import IUser from './types/user.types';

export const loginUser = (address: string): Promise<IUser> => api.post('/api/auth/login', { address }).then(res => res.data);
export const logoutUser = (): Promise<IUser> => api.get('/api/auth/logout').then(res => res.data);
export const me = (): Promise<IUser> => api.get('/api/auth/me').then(res => res.data);