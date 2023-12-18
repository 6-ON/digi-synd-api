import app from "@/app";
import { connectToDb, db } from "@/db";
import { DefaultAuthService } from "@/services/auth";
import { faker } from "@faker-js/faker";
import supertest from "supertest";

describe("Factures", () => {
	beforeAll(async () => {
		await connectToDb();
		payload = await DefaultAuthService.signJWT(token_payload);
	});
	afterAll(async () => {
		await db.close();
	});
	const token_payload = {
		sub: "657f2d4f1d66452bd6338cc7",
		email: "Mireille.Bartoletti54@yahoo.com",
	};
	let payload;
	it("should return a list of factures", async () => {
		const { statusCode, body } = await supertest(app)
			.get("/factures")
			.auth(payload.access_token!, { type: "bearer" });
		expect(statusCode).toBe(200);
		expect(body).toBeInstanceOf(Array);
	});
	it("should create a new facture", async () => {
		const requestBody = {
			m: faker.number.int({ min: 1, max: 12 }),
			y: faker.number.int({ min: new Date().getFullYear(), max: 2060 }),
		};
		const { statusCode, body } = await supertest(app)
			.post("/factures/657f7cab02545dbbd82bd91f")
			.auth(payload.access_token!, { type: "bearer" })
			.send(requestBody);
		expect(statusCode).toBe(201);
		expect(body).toHaveProperty("_id");
	});
});
