import React from "react";

interface MenuProps {
	children: JSX.Element[] | JSX.Element;
}

const Menu: React.FC<MenuProps> = ({ children }) => {
	return <nav className="w-full">{children}</nav>;
};
export default Menu;
