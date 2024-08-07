import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as UC from "./user.controller.js";
const router = Router();

router.post("/register", UC.register);
router.post("/login", auth, UC.login);

export default router;