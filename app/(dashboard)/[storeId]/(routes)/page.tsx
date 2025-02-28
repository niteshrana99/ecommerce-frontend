'use client';

import { Heading } from '@/components/heading';
import { Overview } from '@/components/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetDashboardData } from '@/hooks/dashboard/useGetDashboardData';
import { useGetProducts } from '@/hooks/products/useGetProducts';
import { formatter } from '@/lib/utils';
import { CreditCard, DollarSign, Package } from 'lucide-react';

const DashboardPage = () => {
  const { data, isLoading } = useGetDashboardData();

  const { data: stocks, isLoading: stocksLoading } =
    useGetProducts('isArchived=false');
  if (isLoading || stocksLoading) return null;
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-4 md:p-8 md:pt-6'>
        <Heading
          title='Dashboard'
          description='Overview of your store'
        />
        <Separator />
        <div className='grid gap-4 md:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {formatter.format(data?.totalRevenue || 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Sales</CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+{data?.salesCount || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Stocks</CardTitle>
              <Package className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stocks?.length || 0}</div>
            </CardContent>
          </Card>
        </div>
        <Card className='md:col-span-1'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <Overview data={data?.graphData || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
