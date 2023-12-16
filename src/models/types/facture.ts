import { IFacture } from "@/interfaces/models";
import { Document, ObjectId } from "mongoose";
import { IUserModel } from "./user";

export interface IFactureModel extends Document<ObjectId>, IFacture {
	creator: IUserModel;
}
