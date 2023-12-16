import { ApartmentService } from "@/services";
import { NextFunction, Request, Response } from "express";

export const apartmentParam = async (
	req: Request,
	res: Response,
	next: NextFunction,
	value: string,
) => {
	req.apartment = await ApartmentService.find(value);

	return next();
};
