'use client';

import { useGetUsersStores } from '@/hooks/useGetUsersStores';
import { redirect } from 'next/navigation';
import { SettingsForm } from './components/settings-form';

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = ({ params }) => {
  const { data, isLoading } = useGetUsersStores({ storeId: params?.storeId });

  if (isLoading) return null;

  if (!data) redirect('/');

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={data} />
      </div>
    </div>
  );
};

export default SettingsPage;
