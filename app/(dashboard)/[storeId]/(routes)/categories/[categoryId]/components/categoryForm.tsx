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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetBillBoards } from '@/hooks/billboard/useGetBillboards';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateCategory } from '@/hooks/categories/useCreateCategory';
import { useUpdateCategory } from '@/hooks/categories/useUpdateCategory';

interface InitialData {
  name?: string;
  billboardId?: string;
}

const formSchama = z.object({
  name: z.string().min(3, 'Name must contain three or more letters'),
  billboardId: z.string().min(1, 'Please select a billboard'),
});

const CategoryForm = ({ initialData }: { initialData: InitialData }) => {
  const form = useForm({
    resolver: zodResolver(formSchama),
    defaultValues: {
      name: initialData?.name || '',
      billboardId: initialData?.billboardId || '',
    },
  });

  const { push } = useRouter();

  const { storeId } = useParams();
  const { categoryId } = useParams();
  const { data: billboards, isLoading: billboardsLoading } = useGetBillBoards();
  const mutation = useCreateCategory();
  const { mutate: updateMutate } = useUpdateCategory();

  const onSuccessCb = () => {
    push(`/${storeId}/categories`);
  };

  const onSubmit = (data: InitialData) => {
    if(initialData) {
        updateMutate(
        {
          ...data,
          categoryId
        },
        {
          onSuccess: onSuccessCb,
        }
      );
      return;
    }
    mutation.mutate({
      ...data,
      storeId
    }, {
      onSuccess: onSuccessCb,
    });
  };

  return (
    <div className='p-4 flex flex-col'>
      <div>
        <Form {...form}>
          <form
            className='flex flex-col w-[30%] gap-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Category name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='billboardId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a billboard for the category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!billboardsLoading && billboards.map((billboard: { id: string; label: string }) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button type='submit'>Save changes</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CategoryForm;
