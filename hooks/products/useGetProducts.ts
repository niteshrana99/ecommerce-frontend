import useHttpService from "@/providers/useHttpService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export const useGetProducts = (qs?: string) => {
    const { storeId } = useParams();
    const { get } = useHttpService();

    return useQuery({
        queryKey: ['getProducts', storeId, qs],
        queryFn: async () => {
            const response = await get(qs ? `${storeId}/products?${qs}` :  `${storeId}/products`);
            return response;
        },
    })
}