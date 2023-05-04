import { create } from "zustand";

export interface EditModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useEditModalStore = create<EditModalStore>((set) => ({
	isOpen: false,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true }),
}));

export default useEditModalStore;
