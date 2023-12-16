import jwt, { JwtPayload } from "jsonwebtoken";
import { TJwtPayload } from "./types";

// ----------------------------sign token---------------------------
export const sign = (
	payload: TJwtPayload,
	secret: jwt.Secret,
	opts: jwt.SignOptions,
) => {
	return new Promise<string | undefined>((resolve, reject) => {
		jwt.sign(payload, secret, opts, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
};

// ----------------------------verify token---------------------------
export const verify = (
	token: string,
	secret: jwt.Secret,
	opts?: jwt.VerifyOptions,
) => {
	return new Promise<JwtPayload>((resolve, reject) => {
		jwt.verify(token, secret, opts, (err, decoded) => {
			if (err) reject(err);
			resolve(decoded as JwtPayload);
		});
	});
};

export * from "./types";
