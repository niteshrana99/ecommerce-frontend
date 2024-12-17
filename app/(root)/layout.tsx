'use client';

import { useCheckIfUserHasStoreAPI } from '@/hooks/useCheckIfUserHasStoreAPI';
import { redirect } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: store, isLoading } = useCheckIfUserHasStoreAPI();
  if(isLoading) return null;

  if (store && !isLoading) {
    redirect(`${store.id}`);
    return;
  }
  return <>{children}</>;
}
