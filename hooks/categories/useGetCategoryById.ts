import useHttpService from "@/providers/useHttpService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export const useGetCategoryById = () => {
    const { categoryId } = useParams();
    const { get } = useHttpService();

    return useQuery({
        queryKey: ['getCategoryById', categoryId],
        queryFn: async () => {
            const response = await get(`${categoryId}/category`);
            return response;
        },
    })
}