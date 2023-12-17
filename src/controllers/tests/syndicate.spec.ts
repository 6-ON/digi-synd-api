import app from "@/app";
import { connectToDb, db } from "@/db";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { DefaultAuthService } from "@/services/auth";
describe("Syndicate", () => {
	beforeAll(async () => {
		await connectToDb();
	});
	afterAll(async () => {
		await db.close();
	});
	const token_payload = {
		sub: "657f176b6a23fa2ff3184543",
		email: "admin1702827883267@digi.com",
	};

	const syndicateToCreate = {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		password: "password",
	};
	it("should create a syndicate", async () => {
		const payload = await DefaultAuthService.signJWT(token_payload);
		const { statusCode, body } = await supertest(app)
			.post("/syndicate")
			.auth(payload.access_token!, { type: "bearer" })
			.send(syndicateToCreate);
		expect(statusCode).toBe(201);
		expect(body).toEqual(syndicateToCreate);
	});
});
