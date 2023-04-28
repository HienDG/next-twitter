import React, { Fragment, forwardRef } from "react";
import clsx from "clsx";

interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
	hasError?: boolean;
	errorMessage?: string;
}

// eslint-disable-next-line react/display-name
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
	({ hasError, type = "text", errorMessage, ...restProps }, ref) => {
		const inputClasses = clsx("w-full text-black input-bordered input", {
			["input-primary"]: !hasError,
			["input-error"]: hasError,
		});

		return (
			<div className="w-full form-control">
				<input className={inputClasses} type={type} ref={ref} {...restProps} />
				<Fragment>
					{hasError ? <label className="text-red-500 label">{errorMessage}</label> : null}
				</Fragment>
			</div>
		);
	}
);
export default InputField;
