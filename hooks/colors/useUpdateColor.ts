import { useMutation, useQueryClient } from '@tanstack/react-query';
import useHttpService from '@/providers/useHttpService';
import { useToast } from '../use-toast';
import { useParams } from 'next/navigation';

export const useUpdateColor = () => {
  const { toast } = useToast();
  const { patch } = useHttpService();
  const queryClient = useQueryClient();
  const { storeId, colorId } = useParams();
  return useMutation({
    mutationFn: async (request: any) => {
      const data = await patch(`${storeId}/colors/${colorId}`, request);
      return data;
    },
    onSuccess: () => {
        toast({
            description: "Color updated successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["getAllColors", storeId] });
        queryClient.invalidateQueries({ queryKey: ["getColorById", colorId] });
    },
    onError: (e: any) => {
        toast({
            description: "Color updation failed.",
            variant: "destructive"
        });
    },
  });
};
