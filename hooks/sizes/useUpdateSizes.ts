import { useMutation, useQueryClient } from '@tanstack/react-query';
import useHttpService from '@/providers/useHttpService';
import { useToast } from '../use-toast';
import { useParams } from 'next/navigation';

export const useUpdateSize = () => {
  const { toast } = useToast();
  const { patch } = useHttpService();
  const queryClient = useQueryClient();
  const { storeId, sizeId } = useParams();
  return useMutation({
    mutationFn: async (request: any) => {
      const data = await patch(`${storeId}/sizes/${sizeId}`, request);
      return data;
    },
    onSuccess: () => {
        toast({
            description: "Size updated successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["getAllSizes", storeId] });
        queryClient.invalidateQueries({ queryKey: ["getSizeById", sizeId] });
    },
    onError: (e: any) => {
        toast({
            description: "Size updation failed.",
            variant: "destructive"
        });
    },
  });
};
