import api from '../../axios';
import { unwrapResponse } from '../core/response';

export async function getUsers() {
  const response = await api.get('/users');
  return unwrapResponse(response);
}

export async function getUser(id) {
  const response = await api.get(`/users/${id}`);
  return unwrapResponse(response);
}

export async function updateUser({ id, data }) {
  const response = await api.put(`/users/${id}`, data);
  return unwrapResponse(response);
}

export async function deleteUser(id) {
  const response = await api.delete(`/users/${id}`);
  return unwrapResponse(response);
}

