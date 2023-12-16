import { ObjectId } from "mongoose";

export type TJwtPayload = {
	sub: ObjectId;
	username?: string;
	email?: string;
};
