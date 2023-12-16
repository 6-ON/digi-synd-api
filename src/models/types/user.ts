import { Document, ObjectId } from "mongoose";
import { IUser } from "@/interfaces/models";

export interface IUserModel extends Document<ObjectId>, IUser {}
