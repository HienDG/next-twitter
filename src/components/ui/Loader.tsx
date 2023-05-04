import React from "react";
import { ClipLoader } from "react-spinners";
import type { LoaderSizeProps } from "react-spinners/helpers/props";
import clsx from "clsx";

interface LoaderProps extends LoaderSizeProps {
	wrapperClassName?: string;
}

const Loader: React.FC<LoaderProps> = ({
	size = 80,
	color = "lightblue",
	wrapperClassName,
	...restProps
}) => {
	const rootLoaderClasses = clsx(wrapperClassName, {
		["flex items-center justify-center h-full"]: !wrapperClassName,
	});

	return (
		<div className={rootLoaderClasses}>
			<ClipLoader color={color} size={size} {...restProps} />
		</div>
	);
};
export default Loader;
