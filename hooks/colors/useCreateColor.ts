/* typescript-eslint-disable no-implicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import useHttpService from '@/providers/useHttpService';
import { useToast } from '../use-toast';

export const useCreateColor = () => {
  const { toast } = useToast();
  const { post } = useHttpService();
  const queryClient = useQueryClient();
  const { storeId } = useParams();
  
  return useMutation({
    mutationFn: async (request: any) => {
      const data = await post(`${storeId}/colors`, request);
      return data;
    },
    onSuccess: () => {
        toast({
            description: "Color created successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["getAllColors", storeId] });
    },
    onError: (e: any) => {
        toast({
            description: "Color creation failed.",
            variant: "destructive"
        });
    },
  });
};
