"use client";

import { Heading } from '@/components/heading';
import CategoryForm from './components/categoryForm';
import { Separator } from '@/components/ui/separator';
import { useGetCategoryById } from '@/hooks/categories/useGetCategoryById';

const BillboardFormPage = () => {
  const { data: category, isLoading } = useGetCategoryById()

  if(isLoading) return null;
  return (
    <div>
      <div className='p-4'>
        <Heading
          title={category ? 'Edit category': 'Create a new category'}
          description={category ? 'Update a category': 'Add a new category'}
        />
      </div>
      <Separator />
      <div>
      <CategoryForm initialData={category} />
      </div>
    </div>

  );
};

export default BillboardFormPage;
