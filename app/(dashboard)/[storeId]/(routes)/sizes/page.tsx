'use client';
import { DataTable } from '@/components/data-table';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useGetSizes } from '@/hooks/sizes/useGetSizes';
import { useColumns } from './[sizeId]/components/useColumns';
import { APIList } from './[sizeId]/components/api-list';

const Sizes = () => {
  const { storeId } = useParams();
  const { push } = useRouter();

  const { data: sizes, isLoading } = useGetSizes();
  const columns = useColumns();

  console.log(sizes);

  const addNewSize = () => {
    push(`/${storeId}/sizes/new`);
  };

  if (isLoading) return <></>;

  return (
    <div className='flex flex-col'>
      <div className='flex p-8 justify-between items-center'>
        <Heading
          title={`Sizes (${sizes.length})`}
          description='Manage sizes for your store'
        />
        <Button onClick={addNewSize}>
          <Plus className='h-4 w-4' />
          Add
        </Button>
      </div>
      <Separator />

      <div className='p-4 pl-12 pr-12'>
        <DataTable
          columns={columns}
          data={sizes}
        />
      </div>

      <div className='flex p-8 flex-col'>
        <Heading
          title={`API`}
          description='API calls for sizes'
        />
        
      </div>
      <Separator />
        <APIList entityName='sizes' entityIdName='sizeId' />
    </div>
  );
};

export default Sizes;
