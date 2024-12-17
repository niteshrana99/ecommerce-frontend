import useHttpService from "@/providers/useHttpService";
import { useQuery } from "@tanstack/react-query";
import { get } from "http";
import { useParams } from "next/navigation"

export const useGetBillBoards = () => {
    const { storeId } = useParams();
    const { get } = useHttpService();

    return useQuery({
        queryKey: ['getAllBillboards', storeId],
        queryFn: async () => {
            const response = await get(`getBillboardList/${storeId}`);
            return response;
        },
    })
}