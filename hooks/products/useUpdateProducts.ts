import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import useHttpService from '@/providers/useHttpService';
import { useToast } from '../use-toast';

export const useUpdateProduct = () => {
  const { toast } = useToast();
  const { patch } = useHttpService();
  const queryClient = useQueryClient();
  const { storeId, productId } = useParams();
  
  return useMutation({
    mutationFn: async (request: any) => {
      const data = await patch(`${storeId}/products/${productId}`, request);
      return data;
    },
    onSuccess: () => {
        toast({
            description: "Product updated successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["getProducts", storeId] });
        queryClient.invalidateQueries({ queryKey: ["getProductById", productId] });
    },
    onError: (e: any) => {
        toast({
            description: "Product updation failed.",
            variant: "destructive"
        });
    },
  });
};
