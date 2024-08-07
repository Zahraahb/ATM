import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as TC from "./transaction.controller.js";
const router = Router();

router.get("/",auth,TC.viewTransactions)

export default router;
