export {
	getAllUser,
	getNumberOfUserRecords,
	getUser,
	createNewUser,
	updateUser,
} from "./userCollections";

export type {
	UserCreateData,
	UserPagination,
	UserUpdateData,
	UserWhereInput,
	UserWhereUniqueInput,
} from "./userCollections";

export {
	getAllPosts,
	getPost,
	createPost,
	updatePost,
	getPostWithLimitFields,
} from "./postCollections";

export type {
	PostCreateData,
	PostUniqueInput,
	PostUpdateData,
	PostWhereInput,
} from "./postCollections";

export { getAllNotifications, createNotification } from "./notificationCollections";
export type { NotificationCreateInput, NotificationWhereInput } from "./notificationCollections";
