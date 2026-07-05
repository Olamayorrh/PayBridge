import { useQuery } from '@tanstack/react-query';
import api from '../../axios';
import { unwrapResponse } from './response';

export function useApiQuery({ queryKey, url, params, enabled = true, ...options }) {
  return useQuery({
    queryKey,
    enabled,
    queryFn: async () => {
      const response = await api.get(url, { params });
      return unwrapResponse(response);
    },
    ...options,
  });
}

