import useHttpService from "@/providers/useHttpService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export const useGetProductById = () => {
    const { storeId, productId } = useParams();
    const { get } = useHttpService();

    return useQuery({
        queryKey: ['getProductById', productId],
        queryFn: async () => {
            const response = await get(`${storeId}/products/${productId}`);
            return response;
        },
    })
}