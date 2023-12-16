import { Type } from "class-transformer";
import { IsNumber, Min, Max } from "class-validator";

export class MonthDto {
	@IsNumber()
	@Min(1)
	@Max(12)
	@Type(() => Number)
	m: number;
	@IsNumber()
	@Min(1900)
	@Type(() => Number)
	y: number;
}