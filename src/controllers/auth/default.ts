import { Request, Response } from "express";
import { DefaultAuthService } from "@/services/auth";
import { DefaultLoginDTO } from "@/dto/auth";
import { validateOrReject } from "class-validator";

export class DefaultAuthController {
	static async me(req: Request, res: Response) {
		return res.status(200).json(req.user);
	}
	static async login(req: Request, res: Response) {
		const payload = new DefaultLoginDTO();
		Object.assign(payload, req.body);
		await validateOrReject(payload);
		return res.status(200).json(await DefaultAuthService.login(req.body));
	}

	static async refresh(req: Request, res: Response) {
		return res.status(200).json(await DefaultAuthService.refresh(req.decoded!));
	}
}
