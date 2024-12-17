import { useMutation } from '@tanstack/react-query';
import { useToast } from './use-toast';
import useHttpService from '@/providers/useHttpService';

export const useCreateStoreAPI = () => {
  const { toast } = useToast();
  const { post } = useHttpService();
  return useMutation({
    mutationFn: async (request: any) => {
      const data = await post(`create-store`, request);
      window.location.assign(`/${data.id}`)
      return data;
    },
    onSuccess: () => {
        toast({
            description: "Store created successfully.",
        });
    },
    onError: () => {
        toast({
            description: "Store creation failed.",
            variant: "destructive"
        });
    },
  });
};
