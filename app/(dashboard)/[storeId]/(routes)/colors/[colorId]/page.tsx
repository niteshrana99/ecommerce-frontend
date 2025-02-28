"use client";

import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { useGetColorById } from '@/hooks/colors/useGetColorById';
import ColorsForm from './components/colorsForm';

const SizeFormPage = () => {
  const { data: color, isLoading } = useGetColorById()

  if(isLoading) return null;
  return (
    <div>
      <div className='p-4'>
        <Heading
          title={color ? 'Edit color': 'Create a color'}
          description={color ? 'Update a color': 'Add a new color'}
        />
      </div>
      <Separator />
      <div>
      <ColorsForm initialData={color} />
      </div>
    </div>

  );
};

export default SizeFormPage;
