import { Router, json } from "express";
import cors from "cors";
import authRouter from "./auth";
import { decodeJwt } from "@/middlewares";
import syndicateRouter from "./syndicate";
import apartmentsRouter from "./apartment";
import facturesRouter from "./factures";
import { NotFound } from "http-errors";
const router = Router();
// ---------------------------------------- json and cors ----------------------------------------
router.use(json());
router.use(cors({ origin: process.env.FRONTEND_URL }));
// -----------------------------------------------------------------------------------------------

// ---------------------------------------- auth routes ----------------------------------------

router.use("/auth", authRouter);
router.use(decodeJwt);
// ---------------------------------------------------------------------------------------------


router.use("/syndicate", syndicateRouter);
router.use("/apartments", apartmentsRouter);
router.use("/factures", facturesRouter);
// ---------------------------------------- 404 ----------------------------------------
router.all("*", () => {
	throw new NotFound();
});
// -------------------------------------------------------------------------------------

export default router;
