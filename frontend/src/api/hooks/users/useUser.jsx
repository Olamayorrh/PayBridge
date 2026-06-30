import { useApiMutation } from '../core/useApiMutation';
import { useApiQuery } from '../core/useApiQuery';
import { usersKeys } from './user.keys';
import * as userApi from './user.api';

export function useUsers(options = {}) {
  return useApiQuery({
    queryKey: usersKeys.list(),
    url: '/users',
    ...options,
  });
}

export function useUser(id, options = {}) {
  return useApiQuery({
    queryKey: usersKeys.detail(id),
    url: `/users/${id}`,
    enabled: Boolean(id),
    ...options,
  });
}

export function useUpdateUser(options = {}) {
  return useApiMutation({
    mutationFn: userApi.updateUser,
    invalidateKeys: [usersKeys.all],
    ...options,
  });
}

export function useDeleteUser(options = {}) {
  return useApiMutation({
    mutationFn: userApi.deleteUser,
    invalidateKeys: [usersKeys.all],
    ...options,
  });
}

