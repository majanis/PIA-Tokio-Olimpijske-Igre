import express from "express";
import { UserController } from "../controllers/user.controller";
const registerRouter=express.Router();
import { RequestController} from "../controllers/request.controller"


registerRouter.route('/register').post(
    (req, res)=> new RequestController().register(req, res)
);

registerRouter.route('/getrequests').get(
    (req, res)=> new RequestController().getRequests(req, res)
);

registerRouter.route('/approve').post(
    (req, res)=> new UserController().register(req, res)
);

registerRouter.route('/removerequest').post(
    (req, res)=> new RequestController().removeRequest(req, res)
);

registerRouter.route('/removeleaderrequests').post(
    (req, res)=> new RequestController().removeLeaderRequests(req, res)
);

export default registerRouter;
