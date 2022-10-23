import express from 'express';
import Country from '../models/country';

export class CountryController{
    getAllCountries=(req: express.Request, res:express.Response) => {
        Country.find({}, (err, countries)=>{
            if(err) console.log(err);
            else {
                res.json(countries)
            }
        });
    }

    addGoldMedal=(req: express.Request, res: express.Response) => {
        let name=req.body.name;

        Country.findOneAndUpdate(
            {'name': name}, {$inc: {'gold': 1, 'total': 1}}, (err, country) => {
                if(err) {
                    res.status(400).json({'message': 'country does not exist in DB'});
                }
                else {
                    res.status(200).json({'message': 'added gold medal'});
                }
            }
        );
    }

    addSilverMedal=(req: express.Request, res: express.Response) => {
        let name=req.body.name;

        Country.findOneAndUpdate(
            {'name': name}, {$inc: {'silver': 1, 'total': 1}}, (err, country) => {
                if(err) {
                    res.status(400).json({'message': 'country does not exist in DB'});
                }
                else {
                    res.status(200).json({'message': 'added silver medal'});
                }
            }
        );
    }

    addBronzeMedal=(req: express.Request, res: express.Response) => {
        let name=req.body.name;

        Country.findOneAndUpdate(
            {'name': name}, {$inc: {'bronze': 1, 'total': 1}}, (err, country) => {
                if(err) {
                    res.status(400).json({'message': 'country does not exist in DB'});
                }
                else {
                    res.status(200).json({'message': 'added bronze medal'});
                }
            }
        );
    }

    addTotalMedal=(req: express.Request, res: express.Response) => {
        let name=req.body.name;

        Country.findOneAndUpdate(
            {'name': name}, {$inc: {'total': 1}}, (err, country) => {
                if(err) { 
                    res.status(400).json({'message': 'country does not exist in DB'});
                }
                else {
                    res.status(200).json({'message': 'added total medals'});
                }
            }
        );
    }

    addAthlete=(req: express.Request, res: express.Response) => {
        let name=req.body.name;

        Country.findOneAndUpdate(
            {'name': name}, {$inc: {'athletes': 1}}, (err, country) => {
                if(err) {
                    res.status(400).json({'message': 'country does not exist in DB'});
                }
                else {
                    res.status(200).json({'message': 'added total athletes'});
                }
            }
        );
    }
}


