import React, { Fragment, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface ImageUploadProps {
	placeholder: string;
	selectedFileUrl?: string | null | undefined;
	setSelectedFileUrl: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

// eslint-disable-next-line react/display-name
const ImageUpload: React.FC<ImageUploadProps> = ({
	placeholder,
	setSelectedFileUrl,
	selectedFileUrl,
}) => {
	const covertFileToBase64 = useCallback(
		(files: File[]) => {
			const file = files[0];
			const reader = new FileReader();
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

	const { getRootProps, getInputProps } = useDropzone({
		maxFiles: 1,
		onDrop: covertFileToBase64,
		accept: {
			//  Accept any file with an image/* MIME type
			"image/*": [],
		},
	});

	return (
		<div
			{...getRootProps({
				className:
					"w-full p-4 text-white text-center cursor-pointer border-2 border-dotted rounded-md border-neutral-700",
			})}
		>
			<input {...getInputProps()} />

			<Fragment>
				{selectedFileUrl ? (
					<div className="flex items-center justify-center">
						<Image src={selectedFileUrl} height="100" width="100" alt="Uploaded image" />
					</div>
				) : (
					<p className="text-white">{placeholder}</p>
				)}
			</Fragment>
		</div>
	);
};

export default ImageUpload;
