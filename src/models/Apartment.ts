import { model } from "mongoose";
import { IApartmentModel } from "./types";
import { ApartmentSchema } from "./schema";

export const Apartment = model<IApartmentModel>("Apartment", ApartmentSchema);