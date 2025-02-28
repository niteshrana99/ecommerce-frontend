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
import { useCreateColor } from '@/hooks/colors/useCreateColor';
import { useUpdateColor } from '@/hooks/colors/useUpdateColor';
import Link from 'next/link';

const formSchama = z.object({
  colorName: z.string().min(1, 'Name is required'),
  colorValue: z.string().min(4).regex(/^#/, {
    message: "String must be a valid hex code"
  })
});

interface InitialData {
  name: string;
  value: string;
}

const ColorsForm = ({ initialData }: { initialData: InitialData }) => {
  const form = useForm({
    resolver: zodResolver(formSchama),
    defaultValues: {
      colorName: initialData?.name || '',
      colorValue: initialData?.value || '',
    },
  });

  const { push } = useRouter();

  const { storeId, colorId } = useParams();
  const mutation = useCreateColor();
  const { mutate: updateMutate } = useUpdateColor();

  const onSuccessCb = () => {
    push(`/${storeId}/colors`);
  }

  /**
   * Handles form submission
   * 
   * If initialData is provided, will call updateBillboard mutation
   * otherwise will call createBillboard mutation
   * 
   * @param {Object} data - form data
   */
  const onSubmit = (data : { colorName: string; colorValue: string }) => {
    if(initialData) {
      updateMutate({
        name: data.colorName,
        value: data.colorValue,
        colorId,
      }, {
        onSuccess: onSuccessCb
      });
      return;
    }

    mutation.mutate({
      name: data.colorName,
      value: data.colorValue
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
                name='colorName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Color name ex: Red, Yellow'
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
                name='colorValue'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <div className='flex justify-center align-center gap-2'>
                      <Input
                        placeholder='Please provide Color Hex code ex: #ff0000'
                        {...field}
                      />
                      <div className='h-9 w-9 rounded-full	 border border-black' style={{
                        backgroundColor: field.value
                      }}/>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href={'https://www.w3schools.com/colors/colors_picker.asp'} target='_blank' className='text-xs text-muted-foreground mt-2'>Learn more about color hex codes</Link>
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

export default ColorsForm;
