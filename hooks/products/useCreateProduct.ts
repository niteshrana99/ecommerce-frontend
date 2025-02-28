import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import useHttpService from '@/providers/useHttpService';
import { useToast } from '../use-toast';

export const useCreateProduct = () => {
  const { toast } = useToast();
  const { post } = useHttpService();
  const queryClient = useQueryClient();
  const { storeId } = useParams();
  
  return useMutation({
    mutationFn: async (request: any) => {
      const data = await post(`${storeId}/products`, request);
      return data;
    },
    onSuccess: () => {
        toast({
            description: "Product created successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["getProducts", storeId] });
    },
    onError: (e: any) => {
        toast({
            description: "Product creation failed.",
            variant: "destructive"
        });
    },
  });
};
