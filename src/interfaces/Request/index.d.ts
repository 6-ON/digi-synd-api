import { IApartmentModel, IUserModel } from "@/models/types";
import { TokenPayload } from "google-auth-library";
import { JwtPayload } from "jsonwebtoken";
export {};
declare global {
	namespace Express {
		export interface Request {
			decoded: JwtPayload;
			user: IUserModel;
			apartment: IApartmentModel;
			googleToken: TokenPayload;
		}
		export interface TypedRequest<T extends Express> extends Request {
			body: T;
		}
	}
}
