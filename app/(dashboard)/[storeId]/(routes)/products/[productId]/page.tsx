"use client";

import { Heading } from '@/components/heading';
import ProductForm from './components/productForm';
import { Separator } from '@/components/ui/separator';
import { useGetProductById } from '@/hooks/products/useGetProductById';

const BillboardFormPage = () => {
  const { data: product, isLoading } = useGetProductById()

  if(isLoading) return null;
  return (
    <div>
      <div className='p-4'>
        <Heading
          title={product ? 'Edit product': 'Create a product'}
          description={product ? 'Update a product': 'Add a new product'}
        />
      </div>
      <Separator />
      <div>
      <ProductForm initialData={product} />
      </div>
    </div>

  );
};

export default BillboardFormPage;
