import express from 'express';
import Athlete from '../models/athlete';

export class AthleteController{
    getAllAthletes=(req: express.Request, res:express.Response) => {
        Athlete.find({}, (err, athletes)=>{
            if(err) console.log(err);
            else {
                res.json(athletes)
            }
        });
    }

    getAthleteByName=(req: express.Request, res: express.Response) => {
        let pretraga = req.body.pretraga;

        Athlete.find({'imeprezime': {$regex: pretraga}},
            (err, athlete)=>{
                if(err) console.log(err);
                else {
                    res.json(athlete);
                }
            })
    }

    getAthleteBySport=(req: express.Request, res: express.Response) => {
        let sport = req.body.sport;

        Athlete.find({'sport': sport},
            (err, athlete)=>{
                if(err) console.log(err);
                else {
                    res.json(athlete);
                }
            })
    }

    getAthleteByCountry=(req: express.Request, res: express.Response) => {
        let nacionalnost = req.body.nacionalnost;

        Athlete.find({'nacionalnost': nacionalnost},
            (err, athlete)=>{
                if(err) console.log(err);
                else {
                    res.json(athlete);
                }
            })
    }


    getAthleteByDiscipline=(req: express.Request, res: express.Response) => {
        let disciplina=req.body.disciplina;

        Athlete.find({'discipline': {$all: disciplina}},
            (err, athlete)=>{
                if(err) console.log(err);
                else {
                    res.json(athlete);
                }
            })
    }

    addAthlete=(req: express.Request, res: express.Response) => {
        let athlete= new Athlete(req.body);
        athlete.save().then((athlete)=>{
            res.status(200).json({'message': 'Athlete added!'});
        }).catch((err)=>{
            res.status(400).json({'message': 'Athlete not added'});
        });
 
    }

    addGoldMedal=(req: express.Request, res: express.Response) => {
        let imeprezime=req.body.imeprezime;
        let nacionalnost=req.body.nacionalnost;

        Athlete.findOneAndUpdate(
            {'imeprezime': imeprezime, 'nacionalnost': nacionalnost}, {$inc: {'gold': 1}}, (err, country) => {
                if(err) {
                    res.status(400).json({'message': 'athlete does not exist in DB'});
                }
                else {
                    res.status(200).json({'message': 'added gold medal'});
                }
            }
        );
    }

    addSilverMedal=(req: express.Request, res: express.Response) => {
        let imeprezime=req.body.imeprezime;
        let nacionalnost=req.body.nacionalnost;

        Athlete.findOneAndUpdate(
            {'imeprezime': imeprezime, 'nacionalnost': nacionalnost}, {$inc: {'silver': 1}}, (err, country) => {
                if(err) {
                    res.status(400).json({'message': 'athlete does not exist in DB'});
                }
                else {
                    res.status(200).json({'message': 'added silver medal'});
                }
            }
        );
    }

    addBronzeMedal=(req: express.Request, res: express.Response) => {
        let imeprezime=req.body.imeprezime;
        let nacionalnost=req.body.nacionalnost;

        Athlete.findOneAndUpdate(
            {'imeprezime': imeprezime, 'nacionalnost': nacionalnost}, {$inc: {'bronze': 1}}, (err, country) => {
                if(err) {
                    res.status(400).json({'message': 'athlete does not exist in DB'});
                }
                else {
                    res.status(200).json({'message': 'added bronze medal'});
                }
            }
        );
    }

    addTotalMedal=(req: express.Request, res: express.Response) => {
        let imeprezime=req.body.imeprezime;
        let nacionalnost=req.body.nacionalnost;

        Athlete.findOneAndUpdate(
            {'imeprezime': imeprezime, 'nacionalnost': nacionalnost}, {$inc: {'total': 1}}, (err, country) => {
                if(err) { 
                    res.status(400).json({'message': 'athlete does not exist in DB'});
                }
                else {
                    res.status(200).json({'message': 'added total medals'});
                }
            }
        );
    }

    setRanking=(req: express.Request, res: express.Response) => {
        let imeprezime=req.body.imeprezime;
        let nacionalnost=req.body.nacionalnost;
        let rezultat=req.body.rezultat;

        Athlete.findOneAndUpdate(
            {'imeprezime': imeprezime, 'nacionalnost': nacionalnost}, {'rezultat': rezultat}, (err, athlete) => {
                if(err) {
                    res.status(400).json({'message': 'athlete does not exist in DB'});
                }
                else {
                    res.status(200).json({'message': 'ranking set'});
                } 
            }
        );
    }


}


