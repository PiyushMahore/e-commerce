import { Router } from "express";
import { getCurrentUser, login, logOut, signUp } from "../controllers/user.controller.js";
import verifyJwt from "../middlewares/verifyJwt.middleware.js";

const userRouter = Router();

userRouter.route('/signup').post(signUp);

userRouter.route('/login').post(login);

userRouter.route('/current-user').get(verifyJwt, getCurrentUser);

userRouter.route('/logout').patch(verifyJwt, logOut);

export { userRouter }