'use client';
import { DataTable } from '@/components/data-table';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useColumns } from './[colorId]/components/useColumns';
import { useGetColors } from '@/hooks/colors/useGetColors';
import { APIList } from '@/components/api-list';

const Colors = () => {
  const { storeId } = useParams();
  const { push } = useRouter();

  const { data: colors, isLoading } = useGetColors();
  const columns = useColumns();

  const addNewColor = () => {
    push(`/${storeId}/colors/new`);
  };

  if (isLoading) return <></>;

  return (
    <div className='flex flex-col'>
      <div className='flex p-8 justify-between items-center'>
        <Heading
          title={`Colors (${colors.length})`}
          description='Manage colors for your store'
        />
        <Button onClick={addNewColor}>
          <Plus className='h-4 w-4' />
          Add
        </Button>
      </div>
      <Separator />

      <div className='p-4 pl-12 pr-12'>
        <DataTable
          columns={columns}
          data={colors}
        />
      </div>

      <div className='flex p-8 flex-col'>
        <Heading
          title={`API`}
          description='API calls for colors'
        />
        
      </div>
      <Separator />
        <APIList entityName='colors' entityIdName='colorId' />
    </div>
  );
};

export default Colors;
