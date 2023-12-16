import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { logger } from "../utils";
import { ValidationError } from "class-validator";

export function handleErrors(
	err: Error,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
) {
	// --- Log Errors ---
	logger.error(`${err}`);
	logger.error(`${err.stack}`);
	// --- Check if error has a json message ---
	const hasJsonMessage = err.message?.startsWith("{");

	// --- Set Headers ---
	res.setHeader("Content-Type", "application/json");

	// --- Handle Http Errors ---
	if (err instanceof HttpError)
		return res
			.status(err.statusCode)
			.send(hasJsonMessage ? err.message : JSON.stringify(err));

	// --- Handle Class Validator Errors ---
	if (err[0] instanceof ValidationError)
		return res.status(400).send(JSON.stringify(err));

	return res.status(500).send(JSON.stringify(err));
}
