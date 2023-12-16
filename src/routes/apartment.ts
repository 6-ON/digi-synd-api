import { ApartmentController } from "@/controllers";
import { Router } from "express";
import { apartmentParam } from "./params";
import { requireOwner, verifyJwt } from "@/middlewares";

const router = Router();
router.use(verifyJwt);

router.post("/", ApartmentController.create);

router.get("/", ApartmentController.index);

router.param("apartment", apartmentParam);

router
	.route("/:apartment")
	.all(requireOwner)
	.get(ApartmentController.find)
	.delete(ApartmentController.delete)
	.patch(ApartmentController.update);

export default router;
