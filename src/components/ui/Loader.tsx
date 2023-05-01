import React from "react";
import { ClipLoader } from "react-spinners";

type LoaderProps = {};

const Loader: React.FC<LoaderProps> = () => {
	return (
		<div className="flex items-center justify-center h-full">
			<ClipLoader color="lightblue" size={80} />
		</div>
	);
};
export default Loader;
