import useHttpService from "@/providers/useHttpService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export const useGetSizes = () => {
    const { storeId } = useParams();
    const { get } = useHttpService();

    return useQuery({
        queryKey: ['getAllSizes', storeId],
        queryFn: async () => {
            const response = await get(`${storeId}/sizes`);
            return response;
        },
    })
}