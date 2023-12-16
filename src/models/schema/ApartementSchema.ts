import { Schema } from "mongoose";
import { IApartmentModel } from "../types";

export const ApartmentSchema = new Schema<IApartmentModel>(
	{
		creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
		number: {
			type: Number,
			required: true,
		},
		floor: {
			type: Number,
			required: true,
		},
		owner: {
			name: { type: String, required: true },
			phone: { type: String, required: true },
		},
	},
	{ timestamps: true, toJSON: { versionKey: false } },
);
