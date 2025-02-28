import useHttpService from "@/providers/useHttpService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useParams } from "next/navigation";

export const useDeleteSize = () => {
    const { deleteRequest } = useHttpService();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { storeId } = useParams();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = deleteRequest(`${storeId}/sizes/${id}`);
            return response;
        },
        onSuccess: () => {
            toast({
                description: "Size deleted successfully.",
            });
            queryClient.invalidateQueries({ queryKey: ["getAllSizes", storeId] });
        },
        onError: () => {
            toast({
                description: "Unable to delete Size.",
                variant: "destructive",
            });
        },
    });
}