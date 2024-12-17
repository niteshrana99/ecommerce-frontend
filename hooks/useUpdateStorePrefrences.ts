import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './use-toast';
import { useParams } from 'next/navigation';
import useHttpService from '@/providers/useHttpService';

export const useUpdateStorePrefrences = () => {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const params = useParams();
  const { patch } = useHttpService();
  return useMutation({
    mutationFn: async (request: any) => {
      const token = await getToken();
      const data = await patch(`updateStore/${params.storeId}`, request);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['getAllStores']});
        toast({
            description: "Store updated successfully.",
        });
    },
    onError: (e: any) => {
        toast({
            description: "Store updation failed.",
            variant: "destructive"
        });
    },
  });
};
