import React, { useState, useRef } from "react";
import axios from "axios";
import { DropzoneRef } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";

import { AiFillSchedule } from "react-icons/ai";
import { BsFillImageFill, BsFiletypeGif, BsEmojiSmile } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

import { Button, FormControl, ButtonGroup, ImageUpload } from "@src/components/ui";

import { usePosts } from "@src/hooks";
import { type PostFields, postSchema } from "@libs/zod";

interface TweetFormProps {
	placeholder: string;
	sizes?: "md" | "lg" | "xs" | "sm";
}

const TweetForm: React.FC<TweetFormProps> = ({ placeholder, sizes = "md" }) => {
	const dropzoneRef = useRef<DropzoneRef>(null);
	const [selectedFile, setSelectedFile] = useState<string | null>(null);
	const { mutate: mutatePosts } = usePosts();

	const {
		register,
		formState: { isDirty },
		handleSubmit,
		reset,
	} = useForm<PostFields>({
		resolver: zodResolver(postSchema),
		mode: "onChange",
		defaultValues: {
			body: "",
		},
	});

	const onSubmit: SubmitHandler<PostFields> = async ({ body }) => {
		try {
			await axios.post("/api/tweet", { body });
			mutatePosts();
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}

		reset();
	};

	const uploadImage = () => {
		dropzoneRef.current?.open();
	};

	return (
		<FormControl className="w-full" onSubmit={handleSubmit(onSubmit)}>
			<textarea
				className={clsx(
					"disabled:opacity-80 peer resize-none scrollbar-hide focus:bg-[#151821] focus:text-white placeholder-neutral-400 placeholder:text-lg text-white textarea textarea-bordered textarea-ghost w-full",
					{
						["textarea-md min-h-[100px]"]: sizes === "md",
						["textarea-xs min-h-[70px]"]: sizes === "xs",
						["textarea-sm min-h-[50px]"]: sizes === "sm",
						["textarea-lg min-h-[150px]"]: sizes === "lg",
					}
				)}
				placeholder={placeholder}
				{...register("body")}
			/>

			<ImageUpload
				ref={dropzoneRef}
				setSelectedFileUrl={setSelectedFile}
				selectedFileUrl={selectedFile}
				dropZoneOpt={{
					noDrag: true,
				}}
				height={300}
				width={200}
				noBorder
			/>

			<hr className={"h-[2px] w-full border-x-neutral-800 transition hidden peer-focus:block"} />

			<div className="flex flex-row justify-between mt-4">
				<ButtonGroup className="items-center gap-4 [&>svg]:cursor-pointer [&>svg]:fill-blue-600">
					<BsFillImageFill className="w-5 h-5 hover:opacity-80" onClick={uploadImage} />
					<BsFiletypeGif className="w-5 h-5 hover:opacity-80" />
					<BsEmojiSmile className="w-5 h-5 hover:opacity-80" />
					<AiFillSchedule className="w-5 h-5 hover:opacity-80" />
					<HiLocationMarker className="w-5 h-5 opacity-70 bg-opacity-80" />
				</ButtonGroup>

				<Button
					size="sm"
					type="submit"
					variant="primary"
					className="rounded-full min-w-[100px] text-white"
					disabled={!isDirty}
				>
					Tweet
				</Button>
			</div>
		</FormControl>
	);
};
export default TweetForm;
