import express from "express";
import { userLogin,userLogout,createUser,chatpot,createUserPlan,protectedRoute,paymentRoute } from "../Controllers/UserController.js";
import { authMiddleware } from "../Middlewares/AuthMiddleware.js";

const router = express.Router()

router.post("/create",createUser);
router.post("/plan",createUserPlan);
router.post("/login",userLogin);
router.post("/logout",userLogout);

router.get("/protected",authMiddleware,protectedRoute)
router.post("/payment",paymentRoute)
router.post("/chat",chatpot);

export default router