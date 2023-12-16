import { IApartment } from "@/interfaces/models";
import { Document, ObjectId } from "mongoose";
import { IUserModel } from "./user";

export interface IApartmentModel extends Document<ObjectId>, IApartment {
	creator: IUserModel;
}
