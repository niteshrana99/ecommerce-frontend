'use clients';
import useStoreModal from '@/hooks/useStoreModal';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';
import { Check, ChevronsUpDownIcon, PlusCircle, Store, StoreIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandItem } from './ui/command';
import { CommandGroup, CommandInput, CommandList, CommandSeparator } from 'cmdk';
import { StoreModal } from './modals/storeModal';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: any[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const formattedItems = items?.map((item) => ({
    label: item.name,
    value: item.id,
  })) || [];

  const currentStore = formattedItems.find(item => item.value === params.storeId);

  const onStoreSelect = (store: {value: string, label: string}) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' role='combobox' aria-expanded={open} aria-label='Select a store' className={cn('w-[200px] justify-between', className)}>
            <Store className='mr-2 h-4 w-4' />
            {currentStore?.label}
            <ChevronsUpDownIcon className='ml-auto h-4 w-4 shrink-0 opacity-50'  />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command autoFocus={false}>
          <CommandList>
            <CommandInput placeholder='Search store...' />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading='Stores'>
              {formattedItems.map((store) => (
                <CommandItem key={store.value} onSelect={() => onStoreSelect(store)} className='text-sm'>
                  <StoreIcon className='mr-2 h-4 w-4' />
                    {store.label}
                    <Check className={cn('ml-auto h-4 w-4', currentStore?.value === store.value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={() => storeModal.onOpen()}>
                <PlusCircle className='mr-2 h-5 w-5' />
                Create new store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
};

export default StoreSwitcher;
