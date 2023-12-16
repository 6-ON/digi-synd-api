import { MonthDto } from "@/dto";
import { FactureService } from "@/services";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { Request, Response } from "express";

class Controller {
	async recent(req: Request, res: Response) {
		return res.status(200).json(await FactureService.findAll(5, req.user!));
	}
	async find(req: Request, res: Response) {
		return res.status(200).json(await FactureService.find(req.params.facture));
	}
	async create(req: Request, res: Response) {
		const payload = plainToInstance(MonthDto, req.body);
		await validateOrReject(payload);
		return res.status(200).json(await FactureService.create(req.body, req.apartment!, req.user));
	}
}
export const FactureController = new Controller();
