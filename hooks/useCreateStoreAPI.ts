import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './use-toast';
import useStoreModal from './useStoreModal';
import { redirect } from 'next/navigation';
import useHttpService from '@/providers/useHttpService';

export const useCreateStoreAPI = () => {
  const { toast } = useToast();
  const { onClose } = useStoreModal();
  const queryClient = useQueryClient();
  const { post } = useHttpService();
  return useMutation({
    mutationFn: async (request: any) => {
      const data = await post(`create-store`, request);
      window.location.assign(`/${data.id}`)
      return data;
    },
    onSuccess: (response) => {
        toast({
            description: "Store created successfully.",
        });
    },
    onError: (e: any) => {
        toast({
            description: "Store creation failed.",
            variant: "destructive"
        });
    },
  });
};
