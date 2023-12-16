import {
	IsBase64,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from "class-validator";

import { IsUnique } from "../validations";

export class DefaultRegisterDTO {
	@IsEmail()
	@IsNotEmpty()
	@IsUnique()
	email: string;

	@IsNotEmpty()
	@MaxLength(20)
	@MinLength(6)
	password: string;

	@IsNotEmpty()
	@MaxLength(20)
	name: string;

	@IsOptional()
	@IsBase64()
	image?: string;
}

export class DefaultLoginDTO {
	@IsEmail()
	email: string;

	@IsString()
	@MaxLength(20)
	// @MinLength(6)
	password: string;
}
