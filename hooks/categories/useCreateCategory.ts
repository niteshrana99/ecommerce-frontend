import { useMutation, useQueryClient } from '@tanstack/react-query';
import { redirect, useParams } from 'next/navigation';
import useHttpService from '@/providers/useHttpService';
import { useToast } from '../use-toast';

export const useCreateCategory = () => {
  const { toast } = useToast();
  const { post } = useHttpService();
  const queryClient = useQueryClient();
  const { storeId } = useParams();

  return useMutation({
    mutationFn: async (request: any) => {
      const data = await post(`createCategory`, request);
      return data;
    },
    onSuccess: () => {
      toast({
        description: 'Category created successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['getCategories', storeId] });
    },
    onError: (e: any) => {
      toast({
        description: 'Category creation failed. Please try again.',
        variant: 'destructive',
      });
    },
  });
};
