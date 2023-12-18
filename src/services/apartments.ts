import { ApartmentDto } from "@/dto";
import { Apartment } from "@/models";
import { IApartmentModel, IUserModel } from "@/models/types";
import { flattenObject } from "@/utils";
import { NotFound } from "http-errors";
import { Error } from "mongoose";

class Service {
	async findByMonth(month: Date, creator: IUserModel) {
		try {
			const apartments = await Apartment.aggregate()
				.match({
					$expr: {
						// creator === apartment.creator && createdAt <= month
						$and: [
							{ $eq: ["$creator", creator._id] },
							{ $lte: ["$createdAt", month] },
						],
					},
				})
				.lookup({
					from: "factures",
					localField: "_id",
					foreignField: "apartment",
					as: "factures",
					pipeline: [
						{
							// month === facture.month && year(month) === year(facture.month)
							$match: {
								$expr: {
									$and: [
										{ $eq: [{ $year: "$month" }, { $year: month }] },
										{ $eq: [{ $month: "$month" }, { $month: month }] },
									],
								},
							},
						},
					],
				})
				.addFields({
					isPayed: {
						$cond: {
							if: { $gt: [{ $size: "$factures" }, 0] },
							then: true,
							else: false,
						},
					},
				})
				.project({ factures: 0 });
			return apartments;
		} catch (error) {
			throw error;
		}
	}
	async create(payload: ApartmentDto, creator: IUserModel) {
		try {
			const apartment = await Apartment.create({ ...payload, creator });
			apartment.depopulate("creator");
			return apartment;
		} catch (error) {
			if (error instanceof Error.ValidationError) {
				throw new Error(error.message);
			}
			throw new Error("Something went wrong");
		}
	}
	async find(id: string) {
		try {
			const apartments = await Apartment.findById(id);
			if (!apartments) throw NotFound("Apartment not found");
			return apartments;
		} catch (error) {
			throw new Error("Something went wrong");
		}
	}
	async update(apartment: IApartmentModel, payload: Partial<ApartmentDto>) {
		try {
			const flattenPayload = flattenObject(payload);
			const updatedApartment = await apartment.updateOne({
				$set: flattenPayload,
			});
			return updatedApartment;
		} catch (error) {
			if (error instanceof Error.ValidationError) {
				throw new Error(error.message);
			}
			throw new Error("Something went wrong");
		}
	}
	async delete(apartment: IApartmentModel) {
		try {
			const deletedApartment = await apartment.deleteOne();
			return deletedApartment;
		} catch (error) {
			throw new Error("Something went wrong");
		}
	}
}
export const ApartmentService = new Service();
