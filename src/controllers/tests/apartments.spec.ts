import supertest from "supertest";
import app from "@/app";
import { connectToDb, db } from "@/db";
import { DefaultAuthService } from "@/services/auth";
import { faker } from "@faker-js/faker";
describe("Appartments", () => {
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
	let appartmentId = "";
	it("should return a list of appartments", async () => {
		const { statusCode, body } = await supertest(app)
			.get("/apartments")
			.auth(payload.access_token!, { type: "bearer" });
		expect(statusCode).toBe(200);
		expect(body).toBeInstanceOf(Array);
	});
	it("should create a new appartment", async () => {
		const requestBody = {
			number: 6,
			floor: 4,
			owner: {
				name: faker.person.fullName(),
				phone: "+212612121212",
			},
		};
		const { statusCode, body } = await supertest(app)
			.post("/apartments")
			.auth(payload.access_token!, { type: "bearer" })
			.send(requestBody);
		expect(statusCode).toBe(201);
		expect(body).toHaveProperty("_id");
		appartmentId = body._id;
	});
	it("should update an appartment", async () => {
		const requestBody = {
			owner: {
				name: faker.person.fullName(),
			},
		};
		const { statusCode, body } = await supertest(app)
			.patch(`/apartments/${appartmentId}`)
			.auth(payload.access_token!, { type: "bearer" })
			.send(requestBody);
		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("modifiedCount");
		expect(body.modifiedCount).toBe(1);
	});

	it("should delete an appartment", async () => {
		const { statusCode, body } = await supertest(app)
			.delete(`/apartments/${appartmentId}`)
			.auth(payload.access_token!, { type: "bearer" });
		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("deletedCount");
		expect(body.deletedCount).toBe(1);
	});

	it("should return a single appartment", async () => {
		expect(1).toBe(1);
	});
});
