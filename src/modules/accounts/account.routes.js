import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as AC from "./account.controller.js";
const router = Router();

router.post("/create", auth, AC.createAccount);
router.post("/deposit", auth, AC.deposit);
router.post("/withdraw", auth, AC.withdraw);
router.get("/balance", auth, AC.getBalance);

export default router;