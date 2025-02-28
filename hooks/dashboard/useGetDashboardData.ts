import useHttpService from "@/providers/useHttpService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"


interface GraphData {
    name: string;
    total: number;
  }

  
export const useGetDashboardData = () => {
    const { storeId } = useParams();
    const { get } = useHttpService();

    return useQuery({
        queryKey: ['dashboardData', storeId],
        queryFn: async () => {
            const response = await get(`${storeId}/orders`);
            return response;
        },
        select: (data:any) => {
            const totalRevenue = data.reduce((total: number, order: any) => total + order.orderItems.reduce((subTotal: number, item: any) => subTotal + Number(item.product.price), 0), 0);
            const salesCount = data.length;
            const monthlyRevenue: { [key: number]: number } = {};

            for (const order of data) {
              const month = new Date(order.createdAt).getMonth();
              let revenueForOrder = 0;
          
              for (const item of order.orderItems) {
                revenueForOrder += Number(item.product.price);
              }
              monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
            }
            const graphData: GraphData[] = [
              { name: 'Jan', total: 0 },
              { name: 'Feb', total: 0 },
              { name: 'Mar', total: 0 },
              { name: 'Apr', total: 0 },
              { name: 'May', total: 0 },
              { name: 'Jun', total: 0 },
              { name: 'Jul', total: 0 },
              { name: 'Aug', total: 0 },
              { name: 'Sep', total: 0 },
              { name: 'Oct', total: 0 },
              { name: 'Nov', total: 0 },
              { name: 'Dec', total: 0 },
            ];
          
            for (const month in monthlyRevenue) {
              graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
            }
            return { totalRevenue : totalRevenue, salesCount: salesCount, graphData: graphData };
        }
    })
}