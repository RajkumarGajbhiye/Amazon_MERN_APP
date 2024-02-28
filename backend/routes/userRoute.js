import express from 'express';
import {register,login,logoutUser,getUserProfile,updateUserProfile} from "../controller/userController.js";
import {protect} from "../controller/userController.js"

const router = express.Router();

router.route("/signup").post(register);
router.route("/signin").post(login);
router.route("/logout").post(logoutUser);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);

export default router;