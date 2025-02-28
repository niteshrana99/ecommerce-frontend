'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useParams, useRouter } from 'next/navigation';
import { useDeleteBillboard } from '@/hooks/billboard/useDeleteBillboard';
import { useDeleteProduct } from '@/hooks/products/useDeleteProduct';

type Product = {
  color: { value: string };
  id: string
};

export const useColumns = () => {
  const { toast } = useToast();
  const { push } = useRouter();
  const { storeId } = useParams();
  const { mutate: deleteProduct } = useDeleteProduct();

  const onCopyHandler = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      description: 'Product id copied to the clipboard.',
    })
  };

  const onUpdateHandler = (productId: string) => {
    push(`/${storeId}/products/${productId}`);
  }

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'isArchived',
      header: 'Archived',
    },
    {
      accessorKey: 'isFeatured',
      header: 'Featured',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'));
        return price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'INR',
        });
      }
    },
    {
      accessorKey: 'category.name',
      header: 'Category',
    },
    {
      accessorKey: 'size.name',
      header: 'Size',
    },
    {
      accessorKey: 'color',
      header: 'Color',
      cell: ({row}) => {
        return <div className='flex items-center gap-x-2'>
          {row.original.color.value}
          <div className='h-4 w-4 rounded-full border' style={{
            backgroundColor: row.original.color.value,
          }} />
        </div>
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onCopyHandler(id)}>Copy product id</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdateHandler(id)}>Update</DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteProduct(id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
