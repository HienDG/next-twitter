import React, { useState, useRef, Fragment } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DropzoneRef } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";

import { AiFillSchedule } from "react-icons/ai";
import { BsFillImageFill, BsFiletypeGif, BsEmojiSmile } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

import { Button, FormControl, ButtonGroup, ImageUpload } from "@src/components/ui";

import { usePosts, useFetchSinglePost } from "@src/hooks";
import { type PostFields, postSchema } from "@libs/zod";

interface TweetFormProps {
	placeholder?: string;
	sizes?: "md" | "lg" | "xs" | "sm";
	isComment?: boolean;
	postId?: string;
}

const TweetForm: React.FC<TweetFormProps> = ({
	placeholder,
	sizes = "md",
	postId,
	isComment = false,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedFile, setSelectedFile] = useState<string | null>(null);
	const dropzoneRef = useRef<DropzoneRef>(null);

	const { mutate: mutatePosts } = usePosts();
	const { mutateSinglePost } = useFetchSinglePost(postId);

	const {
		register,
		formState: { isDirty, errors },
		handleSubmit,
		reset,
	} = useForm<PostFields>({
		mode: "onChange",
		defaultValues: {
			body: "",
		},
		resolver: zodResolver(postSchema),
	});

	const onSubmit: SubmitHandler<PostFields> = async ({ body }) => {
		setIsLoading(true);
		try {
			const url = isComment ? `/api/comments?postId=${postId}` : "/api/tweet";
			await axios.post(url, { body, image: selectedFile });

			toast.success(isComment ? "Comment created" : "Tweet created");
			mutatePosts();
			mutateSinglePost();
		} catch (error: unknown) {
			if (error instanceof Error) console.log(error.message);
			toast.error("Something went wrong");
		}
		setIsLoading(false);
		setSelectedFile(null);
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
						["textarea-error"]: errors.body?.message,
					}
				)}
				placeholder={placeholder}
				{...register("body")}
			/>

			<Fragment>
				{!isComment ? (
					<ImageUpload
						ref={dropzoneRef}
						setSelectedFileUrl={setSelectedFile}
						selectedFileUrl={selectedFile}
						dropZoneOpt={{
							noDrag: true,
						}}
						height={400}
						width={400}
						noBorder
						isHidden
					/>
				) : null}
			</Fragment>

			<hr className="h-[2px] w-full border-x-neutral-800 transition opacity-0 peer-focus:opacity-100" />

			<div
				className={clsx("flex flex-row mt-4", {
					["justify-end"]: isComment,
					["justify-between"]: !isComment,
				})}
			>
				<Fragment>
					{!isComment ? (
						<ButtonGroup className="items-center gap-4 [&>svg]:cursor-pointer [&>svg]:fill-blue-600">
							<BsFillImageFill className="w-5 h-5 hover:opacity-80" onClick={uploadImage} />
							<BsFiletypeGif className="w-5 h-5 hover:opacity-80" />
							<BsEmojiSmile className="w-5 h-5 hover:opacity-80" />
							<AiFillSchedule className="w-5 h-5 hover:opacity-80" />
							<HiLocationMarker className="w-5 h-5 opacity-70 bg-opacity-80" />
						</ButtonGroup>
					) : null}
				</Fragment>

				<Button
					size="sm"
					type="submit"
					variant="primary"
					className="rounded-full min-w-[100px] text-white"
					disabled={!isDirty || !!errors.body?.message}
					isLoading={isLoading}
				>
					Tweet
				</Button>
			</div>
		</FormControl>
	);
};
export default TweetForm;
