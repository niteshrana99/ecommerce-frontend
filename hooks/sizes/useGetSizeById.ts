import useHttpService from "@/providers/useHttpService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export const useGetSizeById = () => {
    const { sizeId, storeId } = useParams();
    const { get } = useHttpService();

    return useQuery({
        queryKey: ['getSizeById', sizeId],
        queryFn: async () => {
            const response = await get(`${storeId}/size/${sizeId}`);
            return response;
        },
    })
}