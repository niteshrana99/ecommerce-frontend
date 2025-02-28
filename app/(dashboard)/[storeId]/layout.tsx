'use client';

import Navbar from '@/components/navbar';
import { useGetUsersStores } from '@/hooks/useGetUsersStores';
import { redirect } from 'next/navigation';

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { data, isLoading } = useGetUsersStores({ storeId: params.storeId });

  if(isLoading) {
    return null;
  };

  if (!data && !isLoading) {
    redirect('/');
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
