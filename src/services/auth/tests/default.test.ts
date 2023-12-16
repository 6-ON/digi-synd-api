beforeAll(async () => {
	await connectToDb();
});
afterAll(async () => {
	db.close();
});
describe("DefaultAuthService", () => {
	describe("register", () => {
		it("should create a new user and return a JWT token", async () => {
			// Arrange
			const payload: DefaultRegisterDTO = {
				email: faker.internet.email(),
				password: "password123",
				confirmPassword: "password123",
				name: "Test User",
				image: "https://example.com/image.png",
			};
			// Act
			const result = await DefaultAuthService.register(payload);
			logger.debug(result);
		});
	});
	describe("login", () => {
		it("should return a JWT token", async () => {
			// Arrange
			const payload: DefaultLoginDTO = {
				email: "test@example.com",
				password: "password123",
			};
			// Act
			const result = await DefaultAuthService.login(payload);
			expect(payload.email).toEqual(result.user.email);
			logger.debug(result.user);
		});
	});
	describe("refresh", () => {
		it("should return a new JWT token", async () => {
			// Arrange
			const payload = {
				sub: "655f6be3285f1f13c7ab011a",
			};
			// Act
			const result = await DefaultAuthService.refresh(payload);
			logger.debug(result);
		});
	});
});

import { DefaultLoginDTO, DefaultRegisterDTO } from "../../../dto/auth";
import { logger } from "../../../utils";
import { DefaultAuthService } from "../default";
import "../../../config";
import { connectToDb, db } from "../../../db";
import { faker } from "@faker-js/faker";
