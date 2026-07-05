import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useApiMutation({ mutationFn, invalidateKeys = [], onSuccess, ...options }) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: async (data, variables, context) => {
      await Promise.all(
        invalidateKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey }))
      );

      if (onSuccess) {
        return onSuccess(data, variables, context);
      }
    },
  });
}
