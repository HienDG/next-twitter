import { create } from "zustand";

type AuthModalView = "sign-in" | "sign-up";

interface AuthModalStore {
	isOpen: boolean;
	view: AuthModalView;
	onClose: () => void;
	onOpen: (modalView?: AuthModalView) => void;
	onChangeModalView: () => void;
}

const useAuthModalStore = create<AuthModalStore>((set) => ({
	isOpen: false,
	view: "sign-in",

	onClose: () => set({ isOpen: false }),
	onOpen: (modalView?: AuthModalView) => set({ isOpen: true, view: modalView || "sign-in" }),
	onChangeModalView: () =>
		set((state) => ({ ...state, view: state.view === "sign-in" ? "sign-up" : "sign-in" })),
}));

export default useAuthModalStore;
