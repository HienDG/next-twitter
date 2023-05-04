import React from "react";
import clsx from "clsx";

interface ButtonGroupProps {
	children?: JSX.Element | JSX.Element[];
	direction?: "horizontal" | "vertical";
	className?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, direction, className }) => {
	return (
		<div
			className={clsx(
				"btn-group",
				{
					["btn-group-horizontal"]: direction === "horizontal",
					["btn-group-vertical"]: direction === "vertical",
				},
				className
			)}
		>
			{children}
		</div>
	);
};
export default ButtonGroup;
