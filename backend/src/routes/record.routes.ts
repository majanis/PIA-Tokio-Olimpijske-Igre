import express from "express";
import { RecordController } from "../controllers/record.controller";
const recordRouter=express.Router();

recordRouter.route('/getallrecords').get(
    (req, res)=> new RecordController().getAllRecords(req, res)
);


export default recordRouter;