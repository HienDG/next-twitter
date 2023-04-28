import React from "react";
import clsx from "clsx";

interface FormControlProps extends React.FormHTMLAttributes<HTMLFormElement> {
	children: React.ReactNode;
}

const FormControl: React.FC<FormControlProps> = ({ className, children, ...restProps }) => {
	const formClasses = clsx("w-full space-y-6", className);

	return (
		<form className={formClasses} {...restProps}>
			{children}
		</form>
	);
};
export default FormControl;
