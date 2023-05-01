import React, { Fragment } from "react";
import Image from "next/image";

import { Avatar } from "@src/components/ui";

import { useUserInformation } from "@src/hooks";

interface HeroProps {
	userId: string;
}

const Hero: React.FC<HeroProps> = ({ userId }) => {
	const { userInformation } = useUserInformation(userId);

	return (
		<div>
			<div className="relative bg-neutral-700 h-44">
				<Fragment>
					{userInformation?.coverImage && (
						<Image
							src={userInformation.coverImage || "/images/placeholder.png"}
							fill
							alt="Cover Image"
							style={{ objectFit: "cover" }}
						/>
					)}
				</Fragment>
				<div className="absolute -bottom-16 left-4">
					<Avatar userId={userId} isLarge hasBorder />
				</div>
			</div>
		</div>
	);
};
export default Hero;
