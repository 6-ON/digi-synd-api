import { Schema } from "mongoose";
import { IUserModel } from "../types";
import { hash } from "argon2";
import { Roles } from "@/interfaces/models";

export const UserSchema = new Schema<IUserModel>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		image: { type: String, default: "" },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: Object.values(Roles),
			default: Roles.SYNDICATE,
		},
	},
	{ timestamps: true, toJSON: { versionKey: false } },
);

UserSchema.pre("save", async function (next) {
	// hash password
	if (this.isModified("password")) this.password = await hash(this.password);
	next();
});
