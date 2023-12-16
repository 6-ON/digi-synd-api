/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultLoginDTO, DefaultRegisterDTO } from "@/dto/auth";
import { User } from "@/models";
import { Error as MongoError } from "mongoose";
import argon from "argon2";
import { BadRequest, UnprocessableEntity } from "http-errors";
import { TJwtPayload, sign } from "@/utils";
import { JwtPayload } from "jsonwebtoken";
export class DefaultAuthService {
	static async login({ email, password }: DefaultLoginDTO) {
		const user = await User.findOne({ email });
		if (!user) throw new UnprocessableEntity("Wrong credentials");
		const { password: userPassword, ...cleanedUser } = user.toJSON();
		const isPasswordValid = await argon.verify(userPassword, password);
		if (!isPasswordValid) throw new UnprocessableEntity("Wrong credentials");
		return {
			auth: await this.signJWT({
				sub: user._id,
				email: user.email,
				username: user.name,
			}),
			user: cleanedUser,
		};
	}

	static async register(payload: DefaultRegisterDTO) {
		try {
			const { password, ...user } = (await User.create(payload)).toJSON();
			return {
				auth: await this.signJWT({
					sub: user._id,
					email: user.email,
					username: user.name,
				}),
				user,
			};
		} catch (error) {
			if (error instanceof MongoError.ValidationError)
				throw new BadRequest(JSON.stringify(error));
			throw error;
		}
	}

	static async refresh(payload: TJwtPayload | JwtPayload) {
		const user = await User.findById(payload.sub).select("-password");
		if (!user) throw new UnprocessableEntity("User not found");
		return {
			auth: await this.signJWT({
				sub: user._id,
				email: user.email,
				username: user.name,
			}),
			user,
		};
	}

	static async signJWT(payload: TJwtPayload) {
		return {
			access_token: await sign(payload, process.env.JWT_SECRET!, {
				expiresIn: "15m",
				algorithm: "HS256",
			}),
			refresh_token: await sign(payload, process.env.JWT_SECRET!, {
				expiresIn: "7d",
				algorithm: "HS256",
			}),
		};
	}
	// Add your authentication methods here
}
