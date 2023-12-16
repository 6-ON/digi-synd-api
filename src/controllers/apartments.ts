import { ApartmentDto, MonthDto } from "@/dto";
import { ApartmentService } from "@/services";
import { plainToInstance } from "class-transformer";
import { validate, validateOrReject } from "class-validator";
import { Request, Response } from "express";

class Controller {
	async index(req: Request, res: Response) {
		const payload = plainToInstance(MonthDto, req.query);
		const err = await validate(payload);
		const dateMonth = err.length
			? new Date()
			: new Date(payload.y, payload.m, 1, 0, 0, 0, -1); // to get the last millisecond of the month

		return res
			.status(200)
			.json(await ApartmentService.findByMonth(dateMonth, req.user!));
	}
	async find(req: Request, res: Response) {
		return res.status(200).json(req.apartment!);
	}
	async create(req: Request, res: Response) {
		const payload = plainToInstance(ApartmentDto, req.body);
		await validateOrReject(payload, {
			whitelist: true,
			forbidNonWhitelisted: true,
		});
		return res
			.status(200)
			.json(await ApartmentService.create(payload, req.user));
	}
	async update(req: Request, res: Response) {
		const payload = plainToInstance(ApartmentDto, req.body);
		await validateOrReject(payload, {
			whitelist: true,
			forbidNonWhitelisted: true,
			skipMissingProperties: true,
		});
		return res
			.status(200)
			.json(await ApartmentService.update(req.apartment!, payload));
	}
	async delete(req: Request, res: Response) {
		return res.status(200).json(await ApartmentService.delete(req.apartment!));
	}
}
export const ApartmentController = new Controller();
