import { SyndicateController } from "@/controllers";
import { Roles } from "@/interfaces/models";
import { requireRoles, verifyJwt } from "@/middlewares";
import { Router } from "express";

const router = Router();
router.use(verifyJwt);
router.use(requireRoles([Roles.ADMIN]));
router.post("/", SyndicateController.create);

export default router;
