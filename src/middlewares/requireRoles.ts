import { Response, NextFunction, Request } from "express";
import { Forbidden } from "http-errors";
import { IUser } from "@/interfaces/models";

/**
 * Middleware that checks if the user has the required roles.
 * the middleware should be called after the verifyJwt middleware.
 * If the user has the required roles, the next middleware is called.
 * If the user does not have the required roles, a Forbidden error is thrown.
 * @param roles - An array of roles that the user must have.
 * @returns A middleware function that checks the user's roles.
 */
export const requireRoles =
	(roles: Array<IUser["role"]>) =>
	(req: Request, res: Response, next: NextFunction) => {
		if (roles.includes(req.user!.role)) return next();
		throw new Forbidden("You don't have the required roles");
	};
