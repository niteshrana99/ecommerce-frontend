/* typescript-eslint-disable no-implicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import useHttpService from '@/providers/useHttpService';
import { useToast } from '../use-toast';

export const useCreateSize = () => {
  const { toast } = useToast();
  const { post } = useHttpService();
  const queryClient = useQueryClient();
  const { storeId } = useParams();
  
  return useMutation({
    mutationFn: async (request: any) => {
      const data = await post(`${storeId}/sizes`, request);
      return data;
    },
    onSuccess: () => {
        toast({
            description: "Size created successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["getAllSizes", storeId] });
    },
    onError: (e: any) => {
        toast({
            description: "Size creation failed.",
            variant: "destructive"
        });
    },
  });
};
