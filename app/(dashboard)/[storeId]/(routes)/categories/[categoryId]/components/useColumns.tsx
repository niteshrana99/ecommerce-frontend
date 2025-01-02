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
import { useDeleteCategory } from '@/hooks/categories/useDeleteCategory';

type Category = {
  id: string;
  name: string;
  createdAt: string;
  billboard: {
    label: string;
    id: string;
  };
};

export const useColumns = () => {
  const { toast } = useToast();
  const { push } = useRouter();
  const { storeId } = useParams();
  const { mutate: deleteCategory } = useDeleteCategory();

  const onCopyHandler = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      description: 'Category id copied to the clipboard.',
    })
  };

  const onUpdateHandler = (categoryId: string) => {
    push(`/${storeId}/categories/${categoryId}`);
  }

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'createdAt',
      header: 'Creation Date',
      cell: ({ row }) => {
        return format(row.original?.createdAt, 'MMM dd, yyyy');
      },
    },
    {
      accessorKey: 'billboard',
      header: 'Billboard',
      cell: ({ row }) => {
        return row.original?.billboard.label;
      },
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
              <DropdownMenuItem onClick={() => onCopyHandler(id)}>Copy category id</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdateHandler(id)}>Update</DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteCategory(id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
