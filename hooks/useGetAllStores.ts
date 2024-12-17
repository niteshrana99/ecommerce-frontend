import useHttpService from '@/providers/useHttpService';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

export const useGetStoresList = () => {
  const { getToken } = useAuth();
  const { get } = useHttpService(); 
  return useQuery({
    queryKey: ['getAllStores'],
    queryFn: async () => {
      const token = await getToken();
      const response = await get(`getStoresList`)
      return response;
    },
  });
};
