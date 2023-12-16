import { Request, Response } from "express";
import { DefaultRegisterDTO } from "@/dto/auth";
import { validateOrReject } from "class-validator";
import { UserService } from "@/services";
import { Roles } from "@/interfaces/models";

class Controller {
	async create(req: Request, res: Response) {
		const payload = new DefaultRegisterDTO();
		Object.assign(payload, req.body);
		await validateOrReject(payload);
		await UserService.create(payload, Roles.SYNDICATE);
		return res.status(200).json(payload);
	}
}
export const SyndicateController = new Controller();
