import { Prisma } from "@prisma/client";

import prisma from "@libs/prisma";

export type PostUpdateData = Prisma.PostUpdateArgs["data"];
export type PostUniqueInput = Prisma.PostFindUniqueArgs;
export type PostWhereInput = Prisma.PostFindManyArgs["where"];
export type PostCreateData = Prisma.PostCreateArgs["data"];
export type PostInclude = Prisma.PostFindUniqueArgs["include"];
export type PostWhereUniqueInput = Prisma.PostFindUniqueArgs["where"];

export const getPost = async (where: PostWhereUniqueInput) => {
	return await prisma.post.findUnique({
		where,
	});
};

export const getPostWithLimitFields = async (where: PostWhereUniqueInput) => {
	const limitFields: PostInclude = {
		user: {
			select: {
				name: true,
				username: true,
				email: true,
				id: true,
			},
		},
		comments: {
			include: {
				user: {
					select: {
						name: true,
						username: true,
						email: true,
						id: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		},
	};

	return await prisma.post.findUnique({
		where,
		include: limitFields,
	});
};

export const getAllPosts = async (where?: PostWhereInput) => {
	const limitFields: Prisma.PostFindManyArgs["include"] = {
		user: {
			select: {
				email: true,
				id: true,
				username: true,
				name: true,
			},
		},
		comments: {
			select: {
				id: true,
				body: true,
				userId: true,
			},
		},
	};

	return await prisma.post.findMany({
		where,
		include: limitFields,
		orderBy: {
			createdAt: "desc",
		},
	});
};

export const updatePost = async (postId: string, postUpdateData: PostUpdateData) =>
	await prisma.post.update({
		where: {
			id: postId,
		},
		data: { ...postUpdateData },
	});

export const createPost = async (data: PostCreateData) =>
	await prisma.post.create({
		data: data,
	});
