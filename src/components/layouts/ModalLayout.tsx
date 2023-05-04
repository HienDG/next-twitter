import React from "react";
import clsx from "clsx";

import { AiOutlineClose } from "react-icons/ai";

interface ModalLayoutProps {
	label?: string;
	children: React.ReactNode;
	onClose: () => void;
	className?: string;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({ label, children, onClose, className }) => {
	return (
		<section className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800 bg-opacity-70 scrollbar-hide max-md:bg-black">
			<div className="relative w-full h-full mx-auto my-6 md:w-3/5 lg:w-2/5 lg:max-w-3xl md:h-auto">
				{/* Content */}
				<div className="relative flex flex-col w-full h-full bg-black border-0 rounded-lg shadow-lg outline-none lg:h-auto focus:outline-none min-h-[400px] max-h-[90vh] overflow-y-scroll scrollbar-hide">
					{/* Header */}
					<div className="flex items-center justify-between px-10 py-5 rounded-t ">
						<h3 className="flex-1 text-xl font-semibold text-white">{label}</h3>

						<button
							className="p-1 text-white transition border-0 hover:opacity-70"
							onClick={onClose}
						>
							<AiOutlineClose size={24} />
						</button>
					</div>

					{/* Body */}
					<div
						className={clsx(
							"relative flex-auto mx-auto max-sm:w-full",
							{
								["w-4/5 p-10"]: !className,
							},
							className
						)}
					>
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
