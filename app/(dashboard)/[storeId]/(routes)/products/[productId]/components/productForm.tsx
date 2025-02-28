'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUpload } from '@/components/imageUpload';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { useGetCategories } from '@/hooks/categories/useGetCategories';
import { useGetSizes } from '@/hooks/sizes/useGetSizes';
import { useGetColors } from '@/hooks/colors/useGetColors';
import { Checkbox } from '@/components/ui/checkbox';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';
import { useParams, useRouter } from 'next/navigation';
import { useUpdateProduct } from '@/hooks/products/useUpdateProducts';

type InitialData = {
  name: string;
  images: string[];
  price: number;
  categoryId: string;
  colorId: string;
  sizeId: string;
  isFeatured: boolean;
  isArchived: boolean;
};

const formSchema = z.object({
  name: z.string().min(1),
  images: z.array(z.string()).min(1),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

const ProductForm = ({ initialData }: { initialData: InitialData }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData.price)),
          images: initialData.images.map((image: any) => image.url),
        }
      : {
          name: '',
          images: [],
          price: 0,
          categoryId: '',
          colorId: '',
          sizeId: '',
          isFeatured: false,
          isArchived: false,
        },
  });
  const { storeId } = useParams();
  const [images, setImages] = useState<string[]>([]);
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { data: sizes, isLoading: sizesLoading } = useGetSizes();
  const { data: colors, isLoading: colorsLoading } = useGetColors();
  const { mutate: createProduct, isPending: createProductLoading } =
    useCreateProduct();
  const { mutate: updateProduct, isPending: updateProductLoading } =
    useUpdateProduct();
  const { push } = useRouter();

  const onSuccessCb = () => {
    push(`/${storeId}/products`);
  };

  const onSubmit = async (data: any) => {
    if (!initialData) {
      createProduct(
        {
          ...data,
          storeId,
        },
        {
          onSuccess: onSuccessCb,
        }
      );
    } else if (initialData) {
      updateProduct(
        {
          ...data,
          storeId,
        },
        {
          onSuccess: onSuccessCb,
        }
      );
    }
  };

  useEffect(() => {
    if (initialData) {
      setImages(initialData.images.map((image: any) => image.url));
    }
  }, [initialData]);

  return (
    <div className='p-4 flex flex-col'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex mb-4'>
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => {
                const currentImages = field.value || [];
                return (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl className='mb-4'>
                      <ImageUpload
                        isMultiUpload
                        images={images}
                        setImages={setImages}
                        onChange={(url) => {
                          field.onChange([...currentImages, { url }]);
                        }}
                        onRemove={(urlToRemove) => {
                          const filteredImages = images.filter(
                            (url: any) => url !== urlToRemove
                          );
                          setImages(filteredImages);
                          field.onChange(filteredImages);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Product name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='9.99'
                      type='number'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoey</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!categoriesLoading &&
                        categories.map(
                          (category: { id: string; name: string }) => (
                            <SelectItem
                              key={category.id}
                              value={category.id}
                            >
                              {category.name}
                            </SelectItem>
                          )
                        )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sizeId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a size' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!sizesLoading &&
                        sizes.map((category: { id: string; name: string }) => (
                          <SelectItem
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='colorId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a color' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!colorsLoading &&
                        colors.map((category: { id: string; name: string }) => (
                          <SelectItem
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isFeatured'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isArchived'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='mt-6 flex items-center gap-4'>
            <Button
              type='submit'
              disabled={createProductLoading || updateProductLoading}
            >
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
