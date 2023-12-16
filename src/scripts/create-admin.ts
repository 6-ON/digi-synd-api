import { connectToDb } from "@/db";
import { Roles } from "@/interfaces/models";
import { UserService } from "@/services";

export default async function run() {
	const user = await UserService.create(
		{
			email: `admin${new Date().getTime()}@digi.com`,
			password: "admin",
			name: "admin",
		},
		Roles.ADMIN,
	);
	// log only email and password
	console.table([user.email, "admin"], ["email", "password"]);
}
