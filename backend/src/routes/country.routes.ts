import express from "express";
import { CountryController } from "../controllers/country.controller";
const countryRouter=express.Router();

countryRouter.route('/getallcountries').get(
    (req, res)=> new CountryController().getAllCountries(req, res)
);

countryRouter.route('/addgoldmedal').post(
    (req, res)=> new CountryController().addGoldMedal(req, res)
);

countryRouter.route('/addsilvermedal').post(
    (req, res)=> new CountryController().addSilverMedal(req, res)
);

countryRouter.route('/addbronzemedal').post(
    (req, res)=> new CountryController().addBronzeMedal(req, res)
);

countryRouter.route('/addtotalmedal').post(
    (req, res)=> new CountryController().addTotalMedal(req, res)
);

countryRouter.route('/addathlete').post(
    (req, res)=> new CountryController().addAthlete(req, res)
);

export default countryRouter;