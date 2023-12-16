import { DefaultRegisterDTO } from "@/dto/auth";
import { User } from "../models";
import { NotFound } from "http-errors";
import { Roles } from "@/interfaces/models";
export class UserService {
	static async create(payload: DefaultRegisterDTO, role: Roles) {
		try {
			const user = (await User.create({ ...payload, role })).toJSON();
			return user;
		} catch (error) {
			
			console.log(error);
			throw new Error("Failed to create user");
		}
	}

	static async findById(id: string) {
		const user = await User.findById(id).select(["-password"]);
		if (!user) throw new NotFound("User not found");
		return user;
	}

	static async findAll() {
		try {
			const users = await User.find();
			return users;
		} catch (error) {
			throw new Error("Failed to find users");
		}
	}
}
