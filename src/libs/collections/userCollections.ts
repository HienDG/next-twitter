import { Prisma } from "@prisma/client";

import prisma from "@libs/prisma";

export type UserCreateData = Prisma.UserCreateArgs["data"];
export type UserUpdateData = Prisma.UserUpdateArgs["data"];
export type UserWhereUniqueInput = Prisma.UserFindUniqueArgs["where"];
export type UserWhereInput = Prisma.UserFindManyArgs["where"];
export type UserPagination = {
	limit: number;
	skip: number;
};

const MAX_LIMIT_PER_REQUEST = 3;

export const createNewUser = async (data: UserCreateData) =>
	await prisma.user.create({
		data,
	});

export const updateUser = async (userId: string, data: UserUpdateData) =>
	await prisma.user.update({
		where: {
			id: userId,
		},
		data,
	});

export const getUser = async (where: UserWhereUniqueInput) =>
	await prisma.user.findUnique({
		where,
	});

export const getAllUser = async (where?: UserWhereInput, payload?: UserPagination) =>
	await prisma.user.findMany({
		// Filter emails not include email current user
		where,

		orderBy: {
			createdAt: "desc",
		},
		skip: payload?.skip || 0,
		take: payload?.limit || MAX_LIMIT_PER_REQUEST,
	});

export const getNumberOfUserRecords = async (where: UserWhereInput) =>
	await prisma.user.count({
		where,
	});
