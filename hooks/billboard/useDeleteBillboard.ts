import useHttpService from "@/providers/useHttpService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useParams } from "next/navigation";

export const useDeleteBillboard = () => {
    const { deleteRequest } = useHttpService();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { storeId } = useParams();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = deleteRequest(`deleteBillboard/${id}`);
            return response;
        },
/*************  ✨ Codeium Command ⭐  *************/
/******  af0a346f-6d43-4b10-840e-5c9916d05f46  *******/
        onSuccess: () => {
            toast({
                description: "Billboard deleted successfully.",
            });
            queryClient.invalidateQueries({ queryKey: ["getAllBillboards", storeId] });
        },
        onError: () => {
            toast({
                description: "Unable to delete billboard.",
                variant: "destructive",
            });
        },
    });
}