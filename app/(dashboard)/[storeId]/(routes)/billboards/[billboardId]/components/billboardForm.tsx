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
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCreateBillboard } from '@/hooks/billboard/useCreateBillboard';
import { useUpdateBillboard } from '@/hooks/billboard/useUpdateBillboard';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUpload } from '@/components/imageUpload';

interface InitialData {
  label?: string;
  backgroundImage?: string;
}

const formSchema = z.object({
  billboardName: z.string().min(1, 'Please enter billboard name'),
  billboardImage: z.string().min(1, 'Please upload image for billboard'),
});

const BillboardForm = ({ initialData }: { initialData: InitialData }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
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
  };

  const onSubmit = (data: {
    billboardName: string;
    billboardImage: string;
  }) => {
    if (initialData) {
      updateMutate(
        {
          storeId,
          label: data.billboardName,
          imageUrl: data.billboardImage,
          billboardId,
        },
        {
          onSuccess: onSuccessCb,
        }
      );
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
                        isMultiUpload={false}
                        images={images}
                        setImages={uploadedImages}
                        onChange={(url) => {
                          field.onChange(url);
                        }}
                        onRemove={() => {
                          uploadedImages([]);
                          field.onChange('');
                        }}
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
