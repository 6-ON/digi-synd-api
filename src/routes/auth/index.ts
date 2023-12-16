import { Router } from "express";
import defaultRouter from "./default";
const router = Router();

router.use("/", defaultRouter);

export default router;
