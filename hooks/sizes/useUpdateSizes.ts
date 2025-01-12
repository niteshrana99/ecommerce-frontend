/* typescript-eslint-disable no-implicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useHttpService from '@/providers/useHttpService';
import { useToast } from '../use-toast';
import { useParams } from 'next/navigation';

export const useUpdateSize = () => {
  const { toast } = useToast();
  const { patch } = useHttpService();
  const queryClient = useQueryClient();
  const { storeId } = useParams();
  return useMutation({
    mutationFn: async (request: any) => {
      const data = await patch(`${storeId}/updateSize`, request);
      return data;
    },
    onSuccess: () => {
        toast({
            description: "Size updated successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["getAllSizes", storeId] });
    },
    onError: (e: any) => {
        toast({
            description: "Size updation failed.",
            variant: "destructive"
        });
    },
  });
};
