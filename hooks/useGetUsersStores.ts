import useHttpService from '@/providers/useHttpService';
import { useQuery } from '@tanstack/react-query';

export const useGetUsersStores = ({ storeId }: { storeId: string }) => {
  const { get } = useHttpService();
  return useQuery({
    queryKey: ['getAllUsersStores'],
    queryFn: async () => {
      const response = await get(`getStore/${storeId}`);
      return response
    }
  });
};
