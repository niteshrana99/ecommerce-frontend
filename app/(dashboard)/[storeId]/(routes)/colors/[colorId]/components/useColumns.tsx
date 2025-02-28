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
import { useDeleteColor } from '@/hooks/colors/useDeleteColor';

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
  const { mutate: deleteColor } = useDeleteColor();

  const onCopyHandler = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      description: 'Color id copied to the clipboard.',
    });
  };

  const onUpdateHandler = (colorId: string) => {
    push(`/${storeId}/colors/${colorId}`);
  };

  const columns: ColumnDef<Size>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'value',
      header: 'Label',
      cell: ({ row }) => {
        return (
          <div className='flex items-center gap-2'>
            {row.original?.value}
            <div
              className='h-3 w-3 rounded-full	 border border-black'
              style={{
                backgroundColor: row.original?.value,
              }}
            />
          </div>
        );
      },
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
              <DropdownMenuItem onClick={() => onCopyHandler(id)}>
                Copy color id
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdateHandler(id)}>
                Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteColor(id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
