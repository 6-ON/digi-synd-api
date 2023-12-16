import { Schema } from "mongoose";
import { IFactureModel } from "../types";

export const FactureSchema = new Schema<IFactureModel>(
	{
		apartment: {
			type: Schema.Types.ObjectId,
			ref: "Apartment",
			required: true,
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		month: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true, toJSON: { versionKey: false } },
);
FactureSchema.index({ apartment: 1, month: 1 }, { unique: true });