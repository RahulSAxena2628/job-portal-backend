import express from "express";
import { updateProfile,login,register,logout,getProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router=express.Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route("/logout").get(logout);



router.route("/profile/update").post(isAuthenticated, updateProfile);

router.get("/profile", isAuthenticated, getProfile);

export default router;