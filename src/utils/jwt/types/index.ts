import { ObjectId } from "mongoose";

export type TJwtPayload = {
	sub: ObjectId | string;
	username?: string;
	email?: string;
};
