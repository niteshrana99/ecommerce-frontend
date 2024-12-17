import { create } from 'zustand';

interface IStoreModal {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useStoreModal = create<IStoreModal>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

export default useStoreModal;