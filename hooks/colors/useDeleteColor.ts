import useHttpService from "@/providers/useHttpService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useParams } from "next/navigation";

export const useDeleteColor = () => {
    const { deleteRequest } = useHttpService();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { storeId } = useParams();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = deleteRequest(`${storeId}/colors/${id}`);
            return response;
        },
        onSuccess: () => {
            toast({
                description: "Color deleted successfully.",
            });
            queryClient.invalidateQueries({ queryKey: ["getAllColors", storeId] });
        },
        onError: () => {
            toast({
                description: "Unable to delete Color.",
                variant: "destructive",
            });
        },
    });
}