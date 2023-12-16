import { MonthDto } from "@/dto";
import { Facture } from "@/models";
import { NotFound, UnprocessableEntity } from "http-errors";
import { IApartmentModel, IUserModel } from "@/models/types";
import { Error as MongooseError, mongo } from "mongoose";

class Service {
	async findAll(limit?: number, creator?: IUserModel) {
		let factureQuery = Facture.find({ creator }).populate({
			path: "apartment",
			select: "owner",
		});
		if (limit) factureQuery.limit(limit);
		const factures = await factureQuery.exec();
		return factures;
	}
	async find(id: string) {
		const facture = await Facture.findById(id);
		if (!facture) throw NotFound("Facture not found");
		return facture;
	}
	async create(
		payload: MonthDto,
		apartment: IApartmentModel,
		creator: IUserModel,
	) {
		try {
			const date = new Date(payload.y, payload.m, 1, 0, 0, 0, -1);

			if (date < apartment.createdAt)
				throw new UnprocessableEntity(
					"cant pay months before the apartment creation",
				);

			const facture = await Facture.create({
				month: date,
				apartment,
				creator,
			});
			facture.apartment.owner
			facture.depopulate("creator");
			return facture;
		} catch (error) {
			if (error instanceof mongo.MongoServerError) {
				if (error.code === 11000) throw new UnprocessableEntity("Already Paid");
				else throw error;
			} else throw error;
		}
	}
}
export const FactureService = new Service();
