import express from "express";
import { UserController } from "../controllers/user.controller";
const userRouter=express.Router();

userRouter.route('/login').post(
    (req, res)=> new UserController().login(req, res)
);

userRouter.route('/register').post(
    (req, res)=> new UserController().register(req, res)
);

userRouter.route('/finddelegate').post(
    (req, res)=> new UserController().getCountryDelegateLeader(req, res)
);

userRouter.route('/getalldelegates').get(
    (req, res)=> new UserController().getAllDelegates(req, res)
);

userRouter.route('/getdelegatebyname').post(
    (req, res)=> new UserController().getDelegateByName(req, res)
);

userRouter.route('/checkifusernametaken').post(
    (req, res)=> new UserController().checkIfUsernameTaken(req, res)
);

userRouter.route('/changepassword').post(
    (req, res)=> new UserController().changePassword(req, res)
);

export default userRouter;