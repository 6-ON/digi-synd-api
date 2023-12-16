import { Response, NextFunction, Request } from "express";
import { Unauthorized, BadRequest } from "http-errors";
import { verify } from "../utils";
import { UserService } from "@/services";
import { JsonWebTokenError } from "jsonwebtoken";

export const verifyJwt = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (!req.headers.authorization) throw new Unauthorized();
	if (!req.headers.authorization.startsWith("Bearer ")) throw new BadRequest();
	const token = req.headers.authorization.split(" ")[1];
	if (!token) throw new BadRequest();
	try {
		const decoded = await verify(token, process.env.JWT_SECRET!);
		if (!decoded) throw new Unauthorized();
		req.user = await UserService.findById(decoded.sub!);
		next();
	} catch (err) {
		if (err instanceof JsonWebTokenError) throw new Unauthorized(err.message);
		throw err;
	}
};
