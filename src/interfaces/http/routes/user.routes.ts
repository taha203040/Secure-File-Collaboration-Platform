import { Router } from "express";
import { UserController } from "../controllers/userContollers";

const userRouter = Router();

userRouter.post("/register", UserController.register);
userRouter.post("/signin", UserController.login);

export default userRouter;
