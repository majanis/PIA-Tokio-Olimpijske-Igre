import express from "express";
import { AthleteController } from "../controllers/athlete.controller";
const athleteRouter=express.Router();

athleteRouter.route('/getallathletes').get(
    (req, res)=> new AthleteController().getAllAthletes(req, res)
);

athleteRouter.route('/getathletebyname').post(
    (req, res)=> new AthleteController().getAthleteByName(req, res)
)

athleteRouter.route('/getathletebydiscipline').post(
    (req, res)=> new AthleteController().getAthleteByDiscipline(req, res)
)

athleteRouter.route('/getathletebysport').post(
    (req, res)=> new AthleteController().getAthleteBySport(req, res)
)

athleteRouter.route('/getathletebycountry').post(
    (req, res)=> new AthleteController().getAthleteByCountry(req, res)
)

athleteRouter.route('/addathlete').post(
    (req, res)=> new AthleteController().addAthlete(req, res)
)

athleteRouter.route('/addgoldmedal').post(
    (req, res)=> new AthleteController().addGoldMedal(req, res)
);

athleteRouter.route('/addsilvermedal').post(
    (req, res)=> new AthleteController().addSilverMedal(req, res)
);

athleteRouter.route('/addbronzemedal').post(
    (req, res)=> new AthleteController().addBronzeMedal(req, res)
);

athleteRouter.route('/addtotalmedal').post(
    (req, res)=> new AthleteController().addTotalMedal(req, res)
);

athleteRouter.route('/setranking').post(
    (req, res)=> new AthleteController().setRanking(req, res)
);


export default athleteRouter;