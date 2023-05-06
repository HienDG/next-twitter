import React, { Fragment, useCallback, forwardRef } from "react";
import Dropzone, { type DropzoneOptions, type DropzoneRef } from "react-dropzone";
import clsx from "clsx";
import Image from "next/image";

import { AiOutlineClose } from "react-icons/ai";

type SafeNumber = number | `${number}`;
interface ImageUploadProps {
	placeholder?: string;
	selectedFileUrl: string | null;
	setSelectedFileUrl: React.Dispatch<React.SetStateAction<string | null>>;
	dropZoneOpt?: DropzoneOptions;
	className?: string;
	height?: SafeNumber;
	width?: SafeNumber;
	noBorder?: boolean;
}

// eslint-disable-next-line react/display-name
const ImageUpload = forwardRef<DropzoneRef, ImageUploadProps>((props, ref) => {
	const {
		placeholder,
		setSelectedFileUrl,
		selectedFileUrl,
		dropZoneOpt,
		className,
		height = "100",
		width = "100",
		noBorder = false,
	} = props;

	const covertFileToBase64 = useCallback(
		(files: File[]) => {
			const reader = new FileReader();
			const file = files[0];
			if (file) reader.readAsDataURL(file);

			reader.onload = (event) => {
				if (event.target?.result) {
					const base64 = event.target.result as string;
					setSelectedFileUrl(base64);
				}
			};
		},
		[setSelectedFileUrl]
	);

	const deleteImage = (event: React.MouseEvent<HTMLOrSVGElement>) => {
		event.stopPropagation();

		setSelectedFileUrl(null);
	};

	return (
		<Dropzone
			ref={ref}
			onDrop={covertFileToBase64}
			maxFiles={1}
			accept={{ "image/*": [] }}
			{...dropZoneOpt}
		>
			{({ getInputProps, getRootProps }) => (
				<div
					{...getRootProps({
						className: clsx(
							"w-full p-4 text-white text-center cursor-pointer rounded-md ",
							className,
							{
								[" border-2 border-dotted border-neutral-700"]: !noBorder || selectedFileUrl,
								["hidden"]: !selectedFileUrl,
							}
						),
					})}
				>
					<input {...getInputProps()} />

					<Fragment>
						{selectedFileUrl ? (
							<div className="relative flex items-center justify-center">
								<Image src={selectedFileUrl} height={height} width={width} alt="Uploaded image" />
								<button
									className="absolute top-0 left-0 p-1 text-white transition border-0 hover:opacity-70"
									onClick={deleteImage}
								>
									<AiOutlineClose size={24} />
								</button>
							</div>
						) : (
							<p className="text-white">{placeholder}</p>
						)}
					</Fragment>
				</div>
			)}
		</Dropzone>
	);
});

export default ImageUpload;
