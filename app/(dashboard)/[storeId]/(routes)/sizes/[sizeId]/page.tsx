"use client";

import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { useGetSizeById } from '@/hooks/sizes/useGetSizeById';
import SizesForm from './components/sizesForm';

const SizeFormPage = () => {
  const { data: size, isLoading } = useGetSizeById()

  if(isLoading) return null;
  return (
    <div>
      <div className='p-4'>
        <Heading
          title={size ? 'Edit Size': 'Create a Size'}
          description={size ? 'Update a Size': 'Add a new size'}
        />
      </div>
      <Separator />
      <div>
      <SizesForm initialData={size} />
      </div>
    </div>

  );
};

export default SizeFormPage;
