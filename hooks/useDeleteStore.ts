/* typescript-eslint-disable no-implicit-any */
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './use-toast';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useHttpService from '@/providers/useHttpService';

export const useDeleteStore = () => {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { deleteRequest } = useHttpService();
  return useMutation({
    mutationFn: async () => {
      const token = await getToken();
      const response = deleteRequest(`deleteStore/${params.storeId}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['getAllStores']});
      toast({
        description: 'Store Deleted successfully.',
      });
      router.refresh();
      router.push(`/`);
    },
    onError: (e: any) => {
      toast({
        description: 'Store Deletion failed.',
        variant: 'destructive',
      });
    },
  });
};
