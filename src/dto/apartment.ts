import { Type } from "class-transformer";
import {
	IsNotEmpty,
	IsNumber,
	IsObject,
	IsPhoneNumber,
	IsString,
	Max,
	Min,
	ValidateNested,
} from "class-validator";

class OwnerDto {
	@IsNotEmpty()
	@IsString()
	name: string;
	@IsPhoneNumber()
	@IsNotEmpty()
	phone: string;
}
export class ApartmentDto {
	@IsNumber()
	floor: number;
	@IsNumber()
	number: number;
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => OwnerDto)
	owner: OwnerDto;
}
