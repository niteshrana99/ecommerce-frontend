import { useMutation, useQueryClient } from '@tanstack/react-query';
import useHttpService from '@/providers/useHttpService';
import { useToast } from '../use-toast';
import { useParams } from 'next/navigation';

export const useUpdateCategory = () => {
  const { toast } = useToast();
  const { patch } = useHttpService();
  const queryClient = useQueryClient();
  const { storeId, categoryId } = useParams();
  return useMutation({
    mutationFn: async (request: any) => {
      const data = await patch(`${storeId}/categories/${categoryId}`, request);
      return data;
    },
    onSuccess: () => {
        toast({
            description: "Category updated successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["getCategories", storeId] });
        queryClient.invalidateQueries({ queryKey: ["getCategoryById", categoryId] });
    },
    onError: (e: any) => {
        toast({
            description: "Category updation failed.",
            variant: "destructive"
        });
    },
  });
};
