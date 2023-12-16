import { model } from "mongoose";
import { IUserModel } from "./types";
import { UserSchema } from "./schema";

export const User = model<IUserModel>("User", UserSchema);
