import { useMutation, useQueryClient } from '@tanstack/react-query';
import useHttpService from '@/providers/useHttpService';
import { useToast } from '../use-toast';
import { useParams } from 'next/navigation';

export const useUpdateBillboard = () => {
  const { toast } = useToast();
  const { patch } = useHttpService();
  const queryClient = useQueryClient();
  const { storeId, billboardId } = useParams();
  return useMutation({
    mutationFn: async (request: any) => {
      const data = await patch(`${storeId}/billboards/${billboardId}`, request);
      return data;
    },
    onSuccess: () => {
        toast({
            description: "Billboard updated successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ["getAllBillboards", storeId] });
        queryClient.invalidateQueries({ queryKey: ["getBillboardById", billboardId] });
    },
    onError: (e: any) => {
        toast({
            description: "Billboard updation failed.",
            variant: "destructive"
        });
    },
  });
};
