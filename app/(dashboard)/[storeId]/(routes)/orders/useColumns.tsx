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
      header: 'Products',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'address',
      header: 'Address',
    },
    {
      accessorKey: 'price',
      header: 'Total Price',
    },
    {
      accessorKey: 'isPaid',
      header: 'Paid',
    },
  ];

  return columns;
};
