'use client';

import { ColumnDef } from '@tanstack/react-table';

type Size = {
  name: string;
  value: string;
  id: string;
  createdAt: string;
};

export const useColumns = () => {

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
