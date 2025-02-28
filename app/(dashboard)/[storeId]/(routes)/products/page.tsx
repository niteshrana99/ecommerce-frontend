'use client';
import { DataTable } from '@/components/data-table';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useColumns } from './[productId]/components/useColumns';
import { useGetProducts } from '@/hooks/products/useGetProducts';
import { APIList } from '@/components/api-list';

const Products = () => {
  const { storeId } = useParams();
  const { push } = useRouter();

  const { data: products, isLoading } = useGetProducts();
  const columns = useColumns();

  const addNewProduct = () => {
    push(`/${storeId}/products/new`);
  };

  if (isLoading) return <></>;

  return (
    <div className='flex flex-col'>
      <div className='flex p-8 justify-between items-center'>
        <Heading
          title={`Products (${products?.length})`}
          description='Manage products for your store'
        />
        <Button onClick={addNewProduct}>
          <Plus className='h-4 w-4' />
          Add
        </Button>
      </div>
      <Separator />

      <div className='p-4 pl-12 pr-12'>
        <DataTable
          columns={columns}
          data={products}
        />
      </div>

      <div className='flex p-8 flex-col'>
        <Heading
          title={`API`}
          description='API calls for products'
        />
        
      </div>
      <Separator />
        <APIList entityName='products' entityIdName='productId' />
    </div>
  );
};

export default Products;
