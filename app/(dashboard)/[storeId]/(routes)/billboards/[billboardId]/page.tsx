"use client";

import { Heading } from '@/components/heading';
import BillboardForm from './components/billboardForm';
import { Separator } from '@/components/ui/separator';
import { useGetBillBoardById } from '@/hooks/billboard/useGetBillboardById';

const BillboardFormPage = () => {
  const { data: billboard, isLoading } = useGetBillBoardById()

  if(isLoading) return null;
  return (
    <div>
      <div className='p-4'>
        <Heading
          title={billboard ? 'Edit billboard': 'Create a billboard'}
          description={billboard ? 'Update a billboard': 'Add a new billboard'}
        />
      </div>
      <Separator />
      <div>
      <BillboardForm initialData={billboard} />
      </div>
    </div>

  );
};

export default BillboardFormPage;
