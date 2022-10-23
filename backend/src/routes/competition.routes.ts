import express from "express";
import { CompetitionController } from "../controllers/competition.controller";
const competitionRouter=express.Router();

competitionRouter.route('/getallcompetitions').get(
    (req, res)=> new CompetitionController().getAllCompetitions(req, res)
);

competitionRouter.route('/insertcompetition').post(
    (req, res)=> new CompetitionController().insertCompetiton(req, res)
)

competitionRouter.route('/confirmcompetition').post(
    (req, res)=> new CompetitionController().confirmCompetition(req, res)
)

competitionRouter.route('/endcompetition').post(
    (req, res)=> new CompetitionController().endCompetition(req, res)
)

competitionRouter.route('/adddelegate').post(
    (req, res)=> new CompetitionController().addDelegate(req, res)
)

competitionRouter.route('/addcandidate').post(
    (req, res)=> new CompetitionController().addCandidate(req, res)
)

competitionRouter.route('/addformat').post(
    (req, res)=> new CompetitionController().addFormat(req, res)
)

competitionRouter.route('/addcompetitor').post(
    (req, res)=> new CompetitionController().addCompetitor(req, res)
)

competitionRouter.route('/removerequest').post(
    (req, res)=> new CompetitionController().removeRequest(req, res)
)

competitionRouter.route('/checktimeandlocation').post(
    (req, res)=> new CompetitionController().checkTimeAndLocation(req, res)
)

competitionRouter.route('/settimeandlocation').post(
    (req, res)=> new CompetitionController().setTimeAndLocation(req, res)
)

competitionRouter.route('/checktimeandlocationtennis').post(
    (req, res)=> new CompetitionController().checkTimeAndLocationTennis(req, res)
)

competitionRouter.route('/settimeandlocationtennis').post(
    (req, res)=> new CompetitionController().setTimeAndLocationTennis(req, res)
)

competitionRouter.route('/getcompetitionsbydelegate').post(
    (req, res)=> new CompetitionController().getCompetitionsByDelegate(req, res)
)

competitionRouter.route('/getcompetitionbydata').post(
    (req, res)=> new CompetitionController().getCompetitionByData(req, res)
)

competitionRouter.route('/checkifcandidate').post(
    (req, res)=> new CompetitionController().checkIfCandidateApplied(req, res)
)

export default competitionRouter;