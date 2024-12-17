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
  console.log('Isnide')

  if(isLoading) {
    return null;
  };

  console.log(data)

  if (!data && !isLoading) {
    console.log('Redirecting.....')
    redirect('/');
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
