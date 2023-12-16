import { SyndicateController } from "@/controllers";
import { Router } from "express";

const router = Router();

router.post("/",SyndicateController.create);

export default router;
