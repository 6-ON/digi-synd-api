import { FactureController } from "@/controllers";
import { Router } from "express";
import { apartmentParam } from "./params";
import { verifyJwt } from "@/middlewares";

const router = Router();

router.param("apartment", apartmentParam);
router.use(verifyJwt)
router.get("/",FactureController.recent);
router.post("/:apartment",FactureController.create);


export default router;