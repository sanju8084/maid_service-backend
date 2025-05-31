import express from "express";
import {login, signUp } from "../controllers/auth_controller.js";
import { loginValidation,  signupValidation } from "../middlewares/authMiddleware.js";
const router=express.Router();
router.post('/signUp',signupValidation,signUp);
router.post('/login',loginValidation,login);
export default router;