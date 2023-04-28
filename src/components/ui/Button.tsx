import React from "react";
import clsx from "clsx";

type VariantKey =
	| "primary"
	| "accent"
	| "secondary"
	| "info"
	| "success"
	| "warning"
	| "error"
	| "ghost"
	| "no-variant";
type ButtonSize = "lg" | "md" | "sm" | "xs";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: VariantKey;
	isLoading?: boolean;
	outline?: boolean;
	disabled?: boolean;
	size?: ButtonSize;
}

const buttonVariants: Record<VariantKey, string> = {
	primary: "btn-primary",
	secondary: "btn-secondary",
	accent: "btn-accent",
	info: "btn-info",
	success: "btn-success",
	warning: "btn-warning",
	error: "btn-error",
	ghost: "btn-ghost",
	"no-variant": "",
};

const buttonSize: Record<ButtonSize, string> = {
	lg: "btn-lg",
	md: "btn-md",
	sm: "btn-sm",
	xs: "btn-xs",
};

const Button: React.FC<ButtonProps> = ({
	children,
	className,
	variant = "no-variant",
	isLoading,
	outline,
	disabled,
	size = "md",
	...restProps
}) => {
	const buttonClasses = clsx("btn", className, buttonVariants[variant], {
		["loading"]: isLoading,
		["btn-outline"]: outline,
		["btn-disabled"]: disabled,
		[buttonSize[size]]: size,
	});

	return (
		<button className={buttonClasses} {...restProps}>
			{children}
		</button>
	);
};
export default Button;
