export enum Roles {
	ADMIN = "admin",
	SYNDICATE = "syndicate",
}
export interface IUser {
	email: string;
	name: string;
	image: string;
	password: string;
	role: Roles;
}
