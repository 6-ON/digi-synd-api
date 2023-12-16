import { Router } from "express";
import { DefaultAuthController } from "@/controllers/auth";
import { decodeJwt, verifyJwt } from "@/middlewares";

const router = Router();

router.post("/login", DefaultAuthController.login);
router.get("/me", verifyJwt, DefaultAuthController.me);
router.get("/refresh", decodeJwt, verifyJwt, DefaultAuthController.refresh);
export default router;
