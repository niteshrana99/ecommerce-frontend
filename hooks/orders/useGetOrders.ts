import useHttpService from "@/providers/useHttpService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export const useGetOrders = (flatData?: boolean) => {
    const { storeId } = useParams();
    const { get } = useHttpService();

    return useQuery({
        queryKey: ['getAllOrders', storeId],
        queryFn: async () => {
            const response = await get(`${storeId}/orders`);
            return response;
        },
        select: (data) => {
            if(flatData) {
                const transformedData = data.flatMap((order: { orderItems: any[]; phone: any; address: any; createdAt: any; }) => 
                    order.orderItems.map(item => ({
                        id: item.product.id,
                        name: item.product.name,
                        price: item.product.price,
                        phone: order.phone,
                        address: order.address,
                        isPaid: true,
                        createdAt: order.createdAt,
                        isArchived: item.product.isArchived,
                    }))
                );
                return transformedData
            }
            return data;
        }
    })
}