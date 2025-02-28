'use client';
import { DataTable } from '@/components/data-table';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { useColumns } from './useColumns';
import { useGetOrders } from '@/hooks/orders/useGetOrders';

const Colors = () => {
  const { data: colors, isLoading } = useGetOrders(true);
  const columns = useColumns();

  if (isLoading) return <></>;

  return (
    <div className='flex flex-col'>
      <div className='flex p-8 justify-between items-center'>
        <Heading
          title={`Orders (${colors.length})`}
          description='Manage orders for your store'
        />
      </div>
      <Separator />

      <div className='p-4 pl-12 pr-12'>
        <DataTable
          columns={columns}
          data={colors}
        />
      </div>
    </div>
  );
};

export default Colors;
