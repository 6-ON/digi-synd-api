import supertest from "supertest";
import app from "@/app";
import { connectToDb, db } from "@/db";
import { DefaultAuthService } from "@/services/auth";

describe("Auth", () => {
	beforeAll(async () => {
		await connectToDb();
	});
	afterAll(async () => {
		await db.close();
	});
	const existed_user = {
		email: "admin1702827883267@digi.com",
		password: "admin",
	};
	const token_payload = {
		sub: "657f176b6a23fa2ff3184543",
		...existed_user,
	};
	const wrong_user = {
		email: "wrong@email.com",
		password: "wrong-password",
	};
	it("should login a user", async () => {
		const { statusCode, body } = await supertest(app)
			.post("/auth/login")
			.send(existed_user);
		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("auth");
	});
	it("should refuse to login a user with wrong credentials", async () => {
		const { statusCode } = await supertest(app)
			.post("/auth/login")
			.send(wrong_user);
		expect(statusCode).toBe(422);
	});
	it("should refresh a token", async () => {
		const payload = await DefaultAuthService.signJWT(token_payload);
		const { statusCode, body } = await supertest(app)
			.get("/auth/refresh")
			.auth(payload.refresh_token!, { type: "bearer" });
		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("auth");
	});
});
