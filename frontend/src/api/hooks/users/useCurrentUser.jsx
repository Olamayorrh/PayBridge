import { useMemo } from 'react';
import { useUser } from './useUser';

export function getStoredAuthUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return JSON.parse(localStorage.getItem('authUser'));
  } catch {
    return null;
  }
}

export function useCurrentUser(options = {}) {
  const storedUser = useMemo(() => getStoredAuthUser(), []);
  const query = useUser(storedUser?.id, options);

  return {
    ...query,
    storedUser,
    user: query.data || storedUser,
    userId: storedUser?.id,
  };
}
