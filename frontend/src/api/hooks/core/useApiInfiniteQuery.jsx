import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../../axios';
import { unwrapResponse } from './response';

export function useApiInfiniteQuery({
  queryKey,
  url,
  params,
  getNextPageParam,
  initialPageParam = 1,
  ...options
}) {
  return useInfiniteQuery({
    queryKey,
    initialPageParam,
    getNextPageParam,
    queryFn: async ({ pageParam }) => {
      const response = await api.get(url, {
        params: {
          ...params,
          page: pageParam,
        },
      });

      return unwrapResponse(response);
    },
    ...options,
  });
}

