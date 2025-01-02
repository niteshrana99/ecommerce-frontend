import useHttpService from "@/providers/useHttpService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useParams } from "next/navigation";

export const useDeleteCategory = () => {
    const { deleteRequest } = useHttpService();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { categoryId } = useParams();
    const { storeId } = useParams();

    return useMutation({
        mutationFn: async (categoryId: string) => {
            const response = deleteRequest(`deleteCategory/${categoryId}`);
            return response;
        },
        onSuccess: () => {
            toast({
                description: "Category deleted successfully.",
            });
            queryClient.invalidateQueries({ queryKey: ["getCategories", storeId] });
        },
        onError: () => {
            toast({
                description: "Unable to delete category.",
                variant: "destructive",
            });
        },
    });
}