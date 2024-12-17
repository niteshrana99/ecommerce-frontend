import { useForm } from 'react-hook-form';
import { Modal } from '../ui/modal';
import useStoreModal from '@/hooks/useStoreModal';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateStoreAPI } from '@/hooks/useCreateStoreAPI';
import { redirect } from 'next/navigation';

const formSchama = z.object({
  name: z.string().min(3, 'Name must contain three or more letters'),
});

type formSchamaType = z.infer<typeof formSchama>;

export const StoreModal = () => {
  const { open, onClose } = useStoreModal();
  const form = useForm<formSchamaType>({
    resolver: zodResolver(formSchama),
    defaultValues: {
      name: '',
    },
  });

  const mutation = useCreateStoreAPI();
  const { isPending  } = mutation;

  const { handleSubmit } = form;

  const onSubmit = (data: formSchamaType) => {
    mutation.mutate(data);
  };

  return (
    <Modal
      description='Add a new store to manage products and categories'
      title='Create Store'
      open={open}
      onClose={onClose}
    >
      <div className='space-y-4 py-2 pb-4'>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type='text'
                    placeholder='Enter Name of the store'
                    {...field}
                    disabled={isPending}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='space-x-2 flex justify-end items-center mt-4'>
              <Button disabled={isPending} variant='outline' onClick={onClose}>Cancel</Button>
              <Button disabled={isPending} type='submit'>Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
