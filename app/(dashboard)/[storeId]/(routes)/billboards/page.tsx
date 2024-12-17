'use client';
import { DataTable } from '@/components/data-table';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useGetBillBoards } from '@/hooks/billboard/useGetBillboards';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useColumns } from './[billboardId]/components/useColumns';
import { ColumnDef, Row } from '@tanstack/react-table';
import { APIList } from './[billboardId]/components/api-list';

const Billboards = () => {
  const { storeId } = useParams();
  const { push } = useRouter();

  const { data: bollboardList, isLoading } = useGetBillBoards();
  const columns = useColumns();

  console.log(bollboardList);

  const addNewBillboad = () => {
    push(`/${storeId}/billboards/new`);
  };

  if (isLoading) return <></>;

  return (
    <div className='flex flex-col'>
      <div className='flex p-8 justify-between items-center'>
        <Heading
          title={`Billboards (${bollboardList.length})`}
          description='Manage billboards for your store'
        />
        <Button onClick={addNewBillboad}>
          <Plus className='h-4 w-4' />
          Add
        </Button>
      </div>
      <Separator />

      <div className='p-4 pl-12 pr-12'>
        <DataTable
          columns={columns}
          data={bollboardList}
        />
      </div>

      <div className='flex p-8 flex-col'>
        <Heading
          title={`API`}
          description='API calls for billboards'
        />
        
      </div>
      <Separator />
        <APIList entityName='billboards' entityIdName='billboardId' />
    </div>
  );
};

export default Billboards;
