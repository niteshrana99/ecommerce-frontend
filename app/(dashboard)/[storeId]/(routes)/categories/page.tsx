'use client';
import { DataTable } from '@/components/data-table';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useColumns } from './[categoryId]/components/useColumns';
import { APIList } from './[categoryId]/components/api-list';
import { useGetCategories } from '@/hooks/categories/useGetCategories';

const Billboards = () => {
  const { storeId } = useParams();
  const { push } = useRouter();

  const { data: categoriesList, isLoading } = useGetCategories();
  const columns = useColumns();

  const addNewCategory = () => {
    push(`/${storeId}/categories/new`);
  };

  if (isLoading) return <></>;

  return (
    <div className='flex flex-col'>
      <div className='flex p-8 justify-between items-center'>
        <Heading
          title={`Categories (${categoriesList.length})`}
          description='Manage categories for your store'
        />
        <Button onClick={addNewCategory}>
          <Plus className='h-4 w-4' />
          Add
        </Button>
      </div>
      <Separator />

      <div className='p-4 pl-12 pr-12'>
        <DataTable
          columns={columns}
          data={categoriesList}
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
