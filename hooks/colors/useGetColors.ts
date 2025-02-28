import useHttpService from "@/providers/useHttpService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export const useGetColors = () => {
    const { storeId } = useParams();
    const { get } = useHttpService();

    return useQuery({
        queryKey: ['getAllColors', storeId],
        queryFn: async () => {
            const response = await get(`${storeId}/colors`);
            return response;
        },
    })
}