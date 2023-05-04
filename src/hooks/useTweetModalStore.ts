import { create } from "zustand";

import { EditModalStore } from "./useEditModalStore";

interface TweetModalStore extends EditModalStore {}

const useTweetModalStore = create<TweetModalStore>((set) => ({
	isOpen: false,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true }),
}));

export default useTweetModalStore;
