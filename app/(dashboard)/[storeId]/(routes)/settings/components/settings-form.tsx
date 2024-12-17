'use client';

import { ApiAlert } from '@/components/api-alert';
import { Heading } from '@/components/heading';
import { AlertModal } from '@/components/modals/alertModal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useOrigin } from '@/hooks/use-origin';
import { useDeleteStore } from '@/hooks/useDeleteStore';
import { useUpdateStorePrefrences } from '@/hooks/useUpdateStorePrefrences';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface InitialData {
  id: number;
  name: string;
}

interface SettingFormProps {
  initialData: InitialData;
}

const formSchama = z.object({
  name: z.string().min(3, 'Name must contain three or more letters'),
});

export const SettingsForm = ({ initialData }: SettingFormProps) => {
  const form = useForm({
    resolver: zodResolver(formSchama),
    defaultValues: initialData,
  });

  const origin = useOrigin();
  const params = useParams();

  const { mutate, isPending: loading } = useUpdateStorePrefrences();
  const { mutate: deleteStore } = useDeleteStore();
  const [alertModal, setAlertModal] = useState(false);

  const onUpdateFormPrefrences = (data: any) => {
    mutate(data);
  };
  return (
    <>
      <AlertModal
        isOpen={alertModal}
        onClose={() => setAlertModal(false)}
        loading={loading}
        onConfirm={() => deleteStore()}
      />
      <div className='flex items-center justify-between'>
        <Heading
          title='Settings'
          description='Manage store preferences'
        />
        <Button
          variant='destructive'
          size='icon'
          onClick={() => setAlertModal(true)}
        >
          <Trash className='h-4 w-4' />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdateFormPrefrences)}>
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Store name'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            type='submit'
            className='ml-auto mt-4'
          >
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert title='NEXT_PUBLIC_API_URL' description={`${origin}/api/${params.storeId}`} variant='public' />
    </>
  );
};
