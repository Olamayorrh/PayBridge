import api from '../../axios';
import { unwrapResponse } from '../core/response';

export async function register(payload) {
  const response = await api.post('/auth/register', payload);
  return unwrapResponse(response);
}

export async function login(payload) {
  const response = await api.post('/auth/login', payload);
  return unwrapResponse(response);
}

export async function refresh(payload) {
  const response = await api.post('/auth/refresh', payload);
  return unwrapResponse(response);
}

export async function logout(payload) {
  const response = await api.post('/auth/logout', payload);
  return unwrapResponse(response);
}

