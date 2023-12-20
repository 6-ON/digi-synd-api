import { Roles } from "@/interfaces/models";
import { UserService } from "@/services";

export default async function run() {
	const admin = {
		email: `admin${new Date().getTime()}@digi.com`,
		password: "admin",
		name: "admin",
	};
	const user = await UserService.create(admin, Roles.ADMIN);
	console.table([admin]);
}
