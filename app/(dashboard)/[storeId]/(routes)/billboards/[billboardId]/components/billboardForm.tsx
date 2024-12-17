/* typescript-eslint-disable no-implicit-any */
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
import { ImageUpload } from './imageUpload';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
import { Trash2Icon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCreateBillboard } from '@/hooks/billboard/useCreateBillboard';
import { useUpdateBillboard } from '@/hooks/billboard/useUpdateBillboard';

interface InitialData {
  label?: string;
  backgroundImage?: string;
}

const BillboardForm = ({ initialData }: { initialData: InitialData }) => {
  const form = useForm({
    defaultValues: {
      billboardName: initialData?.label || '',
      billboardImage: initialData?.backgroundImage || '',
    },
  });

  const { push } = useRouter();

  const [images, uploadedImages] = useState<string[]>(
    initialData?.backgroundImage ? [initialData?.backgroundImage] : []
  );
  const { storeId, billboardId } = useParams();
  const mutation = useCreateBillboard();
  const { mutate: updateMutate } = useUpdateBillboard();

  const onSuccessCb = () => {
    push(`/${storeId}/billboards`);
  }

  /**
   * Handles form submission
   * 
   * If initialData is provided, will call updateBillboard mutation
   * otherwise will call createBillboard mutation
   * 
   * @param {Object} data - form data
   */
  const onSubmit = (data : { billboardName: string; billboardImage: string }) => {
    console.log(data)
    if(initialData) {
      updateMutate({
        storeId,
        label: data.billboardName,
        imageUrl: data.billboardImage,
        billboardId,
      }, {
        onSuccess: onSuccessCb
      });
    } else {
      mutation.mutate(
        {
          label: data.billboardName,
          imageUrl: data.billboardImage,
          storeId,
        },
        {
          onSuccess: onSuccessCb,
        }
      );
    }
    
  };

  return (
    <div className='p-4 flex flex-col'>
      <div className='flex flex-row gap-8'>
        {images.map((imgSrc) => {
          return (
            <div
              className='w-[200px] h-[200px] relative overflow-hidden'
              key={imgSrc}
            >
              <Button
                type='button'
                variant='destructive'
                className='z-10 absolute right-2 top-2'
              >
                <Trash2Icon className='w-4 h-4' />
              </Button>

              <Image
                width={200}
                height={200}
                src={imgSrc}
                alt={'bb'}
                className='object-cover'
              />
            </div>
          );
        })}
      </div>
      <div>
        <Form {...form}>
          <form
            className='flex flex-col w-[30%] gap-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <FormField
                control={form.control}
                name='billboardImage'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Image</FormLabel>
                    <FormControl className='mb-4'>
                      <ImageUpload
                        uploadedImages={uploadedImages}
                        {...field}
                        onChange={field.onChange}
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
                name='billboardName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Store name'
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

export default BillboardForm;
