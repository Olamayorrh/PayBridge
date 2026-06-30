import { useApiMutation } from '../core/useApiMutation';
import { authKeys } from './auth.keys';
import * as authApi from './auth.api';

function storeAuthSession(session) {
  localStorage.setItem('accessToken', session.accessToken);
  localStorage.setItem('refreshToken', session.refreshToken);
  localStorage.setItem('authUser', JSON.stringify(session.user));
}

function clearAuthSession() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('authUser');
}

export function useRegister(options = {}) {
  const { onSuccess, ...mutationOptions } = options;

  return useApiMutation({
    mutationFn: authApi.register,
    invalidateKeys: [authKeys.all],
    onSuccess,
    ...mutationOptions,
  });
}

export function useLogin(options = {}) {
  const { onSuccess, ...mutationOptions } = options;

  return useApiMutation({
    mutationFn: authApi.login,
    onSuccess: (session, variables, context) => {
      storeAuthSession(session);
      return onSuccess?.(session, variables, context);
    },
    ...mutationOptions,
  });
}

export function useRefreshToken(options = {}) {
  const { onSuccess, ...mutationOptions } = options;

  return useApiMutation({
    mutationFn: authApi.refresh,
    onSuccess: (session, variables, context) => {
      if (session?.accessToken) {
        localStorage.setItem('accessToken', session.accessToken);
      }

      return onSuccess?.(session, variables, context);
    },
    ...mutationOptions,
  });
}

export function useLogout(options = {}) {
  const { onSuccess, ...mutationOptions } = options;

  return useApiMutation({
    mutationFn: authApi.logout,
    invalidateKeys: [authKeys.all],
    onSuccess: (data, variables, context) => {
      clearAuthSession();
      return onSuccess?.(data, variables, context);
    },
    ...mutationOptions,
  });
}
