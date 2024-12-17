import useHttpService from "@/providers/useHttpService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export const useGetBillBoardById = () => {
    const { billboardId } = useParams();
    const { get } = useHttpService();

    return useQuery({
        queryKey: ['getBillboardById', billboardId],
        queryFn: async () => {
            const response = await get(`getBillboardById/${billboardId}`);
            return response;
        },
    })
}