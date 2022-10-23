import express from "express";
import { SportController } from "../controllers/sport.controller";
const sportRouter=express.Router();

sportRouter.route('/getallsports').get(
    (req, res)=> new SportController().getAllSports(req, res)
);

sportRouter.route('/insertsport').post(
    (req, res) => new SportController().insertSport(req, res)
);

sportRouter.route('/getsport').post(
    (req, res) => new SportController().getSport(req, res)
);

sportRouter.route('/adddiscipline').post(
    (req, res) => new SportController().addDisciplineToSport(req, res)
)


export default sportRouter;