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

type Billboard = {
  id: string;
  label: string;
  creationDate: string;
  createdAt: string;
};

export const useColumns = () => {
  const { toast } = useToast();
  const { push } = useRouter();
  const { storeId } = useParams();
  const { mutate: deleteBillboard } = useDeleteBillboard();

  const onCopyHandler = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      description: 'Billboard id copied to the clipboard.',
    })
  };

  const onUpdateHandler = (billboardId: string) => {
    push(`/${storeId}/billboards/${billboardId}`);
  }

  const columns: ColumnDef<Billboard>[] = [
    {
      accessorKey: 'label',
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
              <DropdownMenuItem onClick={() => onCopyHandler(id)}>Copy billboard id</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdateHandler(id)}>Update</DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteBillboard(id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
