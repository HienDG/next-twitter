import React from "react";

import { AiOutlineClose } from "react-icons/ai";

interface ModalLayoutProps {
	label?: string;
	children: React.ReactNode;
	onClose: () => void;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({ label, children, onClose }) => {
	return (
		<section className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800 bg-opacity-70 scrollbar-hide">
			<div className="relative w-full h-full mx-auto my-6 md:w-3/5 lg:w-2/5 lg:max-w-3xl md:h-auto">
				{/* Content */}
				<div className="relative flex flex-col w-full h-full bg-black border-0 rounded-lg shadow-lg outline-none lg:h-auto focus:outline-none">
					{/* Header */}
					<div className="flex items-center justify-between p-10 rounded-t ">
						<h3 className="text-3xl font-semibold text-white">{label}</h3>

						<button
							className="p-1 ml-auto text-white transition border-0 hover:opacity-70"
							onClick={onClose}
						>
							<AiOutlineClose size={20} />
						</button>
					</div>

					{/* Body */}
					<div className="relative flex-auto p-10">
						{children && Array.isArray(children) ? children[0 as keyof typeof children] : children}
					</div>

					{/* Footer */}
					<div className="flex flex-col gap-2 p-10 pt-4">
						{children && Array.isArray(children) ? children[1 as keyof typeof children] : null}
					</div>
				</div>
			</div>
		</section>
	);
};
export default ModalLayout;
