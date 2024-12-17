import useHttpService from '@/providers/useHttpService';
import { useQuery } from '@tanstack/react-query';

export const useCheckIfUserHasStoreAPI = () => {
  const { get } = useHttpService();
  return useQuery({
    queryKey: ['checkIfUserHasStore'],
    queryFn: async () => {
      const data = await get(`checkIfUserHasStore`);
      return data;
    },
  });
};
