import { User } from "@/models";
import { logger } from "@/utils";
import { registerDecorator, ValidationOptions } from "class-validator";

export function IsUnique(validationOptions?: ValidationOptions) {
	return function (object: NonNullable<unknown>, propertyName: string) {
		registerDecorator({
			name: "IsUnique",
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			async: true,
			validator: {
				async validate(value: unknown) {
					const user = await User.findOne({ [propertyName]: value }, { _id: 1 });
					logger.debug(user);
					return typeof value === "string" && value.length > 0 && user === null;
				},
				defaultMessage: () => `${propertyName} is already taken`,
			},
		});
	};
}
