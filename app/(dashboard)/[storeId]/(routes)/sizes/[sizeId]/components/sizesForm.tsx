'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateSize } from '@/hooks/sizes/useCreateSize';
import { useUpdateSize } from '@/hooks/sizes/useUpdateSizes';

const formSchama = z.object({
  sizeName: z.string().min(1, 'Name is required'),
  sizeValue: z.string().min(1, 'Value is required'),
});

interface InitialData {
  name: string;
  value: string;
}

const SizesForm = ({ initialData }: { initialData: InitialData }) => {
  const form = useForm({
    resolver: zodResolver(formSchama),
    defaultValues: {
      sizeName: initialData?.name || '',
      sizeValue: initialData?.value || '',
    },
  });

  const { push } = useRouter();

  const { storeId, sizeId } = useParams();
  const mutation = useCreateSize();
  const { mutate: updateMutate } = useUpdateSize();

  const onSuccessCb = () => {
    push(`/${storeId}/sizes`);
  }

  /**
   * Handles form submission
   * 
   * If initialData is provided, will call updateBillboard mutation
   * otherwise will call createBillboard mutation
   * 
   * @param {Object} data - form data
   */
  const onSubmit = (data : { sizeName: string; sizeValue: string }) => {
    if(initialData) {
      updateMutate({
        name: data.sizeName,
        value: data.sizeValue,
        sizeId,
      }, {
        onSuccess: onSuccessCb
      });
      return;
    }

    mutation.mutate({
      name: data.sizeName,
      value: data.sizeValue
    }, {
      onSuccess: onSuccessCb
    })
  };

  return (
    <div className='p-4 flex flex-col'>
      <div>
        <Form {...form}>
          <form
            className='flex flex-col w-[30%] gap-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
            <FormField
                control={form.control}
                name='sizeName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Size name ex: Large, Medium, Small'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name='sizeValue'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Size value ex: L, SM, XS etc.'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type='submit'>Save changes</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SizesForm;
