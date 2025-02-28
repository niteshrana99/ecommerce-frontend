import useHttpService from "@/providers/useHttpService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useParams } from "next/navigation";

export const useDeleteProduct = () => {
    const { deleteRequest } = useHttpService();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { storeId } = useParams();

    return useMutation({
        mutationFn: async (productId: string) => {
            const response = deleteRequest(`/${storeId}/products/${productId}`);
            return response;
        },
        onSuccess: () => {
            toast({
                description: "Product deleted successfully.",
            });
            queryClient.invalidateQueries({ queryKey: ["getProducts", storeId] });
        },
        onError: () => {
            toast({
                description: "Unable to delete Product.",
                variant: "destructive",
            });
        },
    });
}