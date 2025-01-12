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
import { useDeleteSize } from '@/hooks/sizes/useDeleteSize';

type Size = {
  name: string;
  value: string;
  id: string;
  createdAt: string;
};

export const useColumns = () => {
  const { toast } = useToast();
  const { push } = useRouter();
  const { storeId } = useParams();
  const { mutate: deleteSize } = useDeleteSize();

  const onCopyHandler = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      description: 'Size id copied to the clipboard.',
    })
  };

  const onUpdateHandler = (sizeId: string) => {
    push(`/${storeId}/sizes/${sizeId}`);
  }

  const columns: ColumnDef<Size>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'value',
      header: 'Label',
    },
    {
      accessorKey: 'createdAt',
      header: 'Creation Date',
      cell: ({ row }) => {
        return format(row.original?.createdAt, 'MMM dd, yyyy');
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
              <DropdownMenuItem onClick={() => onCopyHandler(id)}>Copy size id</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdateHandler(id)}>Update</DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteSize(id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
