import useHttpService from "@/providers/useHttpService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export const useGetColorById = () => {
    const { colorId, storeId } = useParams();
    const { get } = useHttpService();

    return useQuery({
        queryKey: ['getColorById', colorId],
        queryFn: async () => {
            const response = await get(`${storeId}/colors/${colorId}`);
            return response;
        },
    })
}