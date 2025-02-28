import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import useHttpService from '@/providers/useHttpService';
import { useToast } from '../use-toast';

export const useCreateBillboard = () => {
  const { toast } = useToast();
  const { post } = useHttpService();
  const queryClient = useQueryClient();
  const { storeId } = useParams();
  
  return useMutation({
    mutationFn: async (request: any) => {
      const data = await post(`${storeId}/billboards`, request);
      return data;
    },
    onSuccess: () => {
        toast({
            description: "Billboard created successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["getAllBillboards", storeId] });
    },
    onError: (e: any) => {
        toast({
            description: "Billboard creation failed.",
            variant: "destructive"
        });
    },
  });
};
