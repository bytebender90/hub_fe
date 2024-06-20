import api from './api';
import { ITrackToken } from './types/user.types';

export const getTokenInfo = (type: string, query: string) => api.post('/api/users/token/getTokenInfo', { type, query }).then((res) => res.data);
export const addToken = (token: ITrackToken) => api.post('/api/users/addToken', token ).then((res) => res.data);
export const getNftPrices = () => api.post('/api/users/token/getNftPrices').then((res) => res.data);
export const getTokenPrices = () => api.post('/api/users/token/getTokenPrices').then((res) => res.data);