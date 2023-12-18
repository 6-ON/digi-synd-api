import { FactureController } from "@/controllers";
import { Router } from "express";
import { apartmentParam } from "./params";
import { requireOwner, verifyJwt } from "@/middlewares";

const router = Router();

router.param("apartment", apartmentParam);
router.use(verifyJwt);
router.get("/", FactureController.recent);
router.post("/:apartment", requireOwner, FactureController.create);

export default router;
