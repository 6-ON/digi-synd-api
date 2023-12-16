import { Request, Response, NextFunction } from "express";
import { JwtPayload, decode } from "jsonwebtoken";

export const decodeJwt = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return next();
	const decoded = decode(token, { json: true });
	if (!decoded) return next();
	req.decoded = decoded;

	next();
};
