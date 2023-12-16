import { model } from "mongoose";
import { IFactureModel } from "./types";
import { FactureSchema } from "./schema";

export const Facture = model<IFactureModel>("Facture", FactureSchema);
