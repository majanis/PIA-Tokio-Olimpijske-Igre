import express, { json } from 'express';
import Competition from '../models/competition';

export class CompetitionController{
    getAllCompetitions=(req: express.Request, res:express.Response) => {
        Competition.find({}, (err, competition)=>{
            if(err) console.log(err);
            else {
                res.json(competition)
            }
        });
    }

    getCompetitionByData=(req: express.Request, res: express.Response) => {
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;
        let vrsta=req.body.vrsta;

        console.log("get comp called");

        Competition.findOne({'sport': sport, 'disciplina': disciplina, 'pol': pol, 'vrsta': vrsta}, (err, competition)=>{
            if(err || competition==null) {
                console.log(err);
                res.json(null);
            }
            else {
                console.log(competition);
                res.json(competition);
            }
        });
    }

    addDelegate=(req: express.Request, res: express.Response) => {
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;
        let vrsta=req.body.vrsta;
        let delegat=req.body.delegat;

        Competition.findOneAndUpdate({'sport': sport, 'disciplina': disciplina, 'pol': pol, 'vrsta': vrsta}, 
        {$push: {delegat: delegat}},
        (err, success) => {
            if(err) res.status(200).json({'message': 'could not change delegate'});
            else res.status(200).json({'message': 'changed delegate'});
        }
        );
    }

    addFormat=(req: express.Request, res: express.Response) => {
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;
        let vrsta=req.body.vrsta;
        let format=req.body.format;

        Competition.findOneAndUpdate({'sport': sport, 'disciplina': disciplina, 'pol': pol, 'vrsta': vrsta}, {'format': format},
        (err, success) => {
            if(err) res.status(200).json({'message': 'could not change format'});
            else res.status(200).json({'message': 'changed format'});
        }
        );
    }

    addCompetitor=(req: express.Request, res: express.Response) => {
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;
        let vrsta=req.body.vrsta;
        let takmicar=req.body.takmicar;

        Competition.findOneAndUpdate(
            { 'sport': sport, 'disciplina': disciplina, 'pol': pol, 'vrsta': vrsta }, 
            { $push: {takmicari: takmicar} },
            (err, success)=> {
                if(err) {
                    res.status(400).json({'message': 'error adding competitor'});
                }
                else {
                    res.status(200).json({'message': 'added competitor'});
                }
            }
        );
        
    }

    removeRequest=(req: express.Request, res: express.Response) => {
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;
        let vrsta=req.body.vrsta;
        let prijavljen=req.body.prijavljen;

        Competition.findOneAndUpdate(
            { 'sport': sport, 'disciplina': disciplina, 'pol': pol, 'vrsta': vrsta }, 
            { $pull: {prijavljeni: prijavljen} },
            (err, success)=> {
                if(err) {
                    res.status(400).json({'message': 'error removing request'});
                }
                else {
                    res.status(200).json({'message': 'removed request'});
                }
            }
        );
    }

    addCandidate=(req: express.Request, res: express.Response) => {
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;
        let vrsta=req.body.vrsta;
        let prijavljen=req.body.prijavljen;

        Competition.findOneAndUpdate(
            { 'sport': sport, 'disciplina': disciplina, 'pol': pol, 'vrsta': vrsta }, 
            { $push: {prijavljeni: prijavljen} },
            (err, success)=> {
                if(err) {
                    res.status(400).json({'message': 'error adding request'});
                }
                else {
                    console.log(success);
                    res.status(200).json({'message': 'added request'});
                }
            }
        );
    }

    insertCompetiton=(req: express.Request, res: express.Response)=> {
            let competition= new Competition(req.body);
            competition.save().then((competition)=>{
                res.status(200).json({'message': 'Competition added!'});
            }).catch((err)=>{
                res.status(400).json({'message': 'Competition not added'});
            });
    }

    confirmCompetition=(req: express.Request, res: express.Response)=> {
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;
        let vrsta=req.body.vrsta;

        Competition.findOneAndUpdate(
            { 'sport': sport, 'disciplina': disciplina, 'pol': pol, 'vrsta': vrsta }, 
            { 'potvrdjeno': true },
            (err, success)=> {
                if(err) {
                    res.status(400).json({'message': 'error approving competition'});
                }
                else {
                    res.status(200).json({'message': 'approved competition'});
                }
            }
        );
    }

    endCompetition=(req: express.Request, res: express.Response)=> {
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;
        let vrsta=req.body.vrsta;
        let pobednik=req.body.pobednik;
        let drugi= req.body.drugi;
        let treci=req.body.treci;

        Competition.findOneAndUpdate(
            { 'sport': sport, 'disciplina': disciplina, 'pol': pol, 'vrsta': vrsta }, 
            { 'zavrseno': true, 'pobednik': pobednik, 'drugi': drugi, 'treci': treci},
            (err, success)=> {
                if(err) {
                    res.status(400).json({'message': 'error ending competition'});
                }
                else {
                    res.status(200).json({'message': 'ended competition'});
                }
            }
        );
    }

    checkTimeAndLocation=(req: express.Request, res: express.Response)=>{
        let pocetak=req.body.pocetak;
        let lokacija=req.body.lokacija;

        Competition.findOne(
            {'pocetak': pocetak, 'lokacija': lokacija}, (err, competition) => {
                if(err || competition==null) {
                    res.status(200).json({'message': 'free'});
                }
                else {
                    res.status(200).json({'message': 'not free'});
                }
            }
        );
        
    }

    setTimeAndLocation=(req: express.Request, res: express.Response)=>{
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;
        let vrsta=req.body.vrsta;
        let pocetak=req.body.pocetak;
        let kraj=req.body.kraj;
        let lokacija=req.body.lokacija;

        console.log(sport, disciplina, pol, vrsta, pocetak, kraj);

        Competition.findOneAndUpdate(
            { 'sport': sport, 'disciplina': disciplina, 'pol': pol, 'vrsta': vrsta }, 
            { 'lokacija': lokacija, 'pocetak': pocetak, 'kraj': kraj },
            (err, success)=> {
                if(err) {
                    res.status(400).json({'message': 'error setting time and location'});
                }
                else {
                    console.log(success);
                    res.status(200).json({'message': 'set time and location'});
                }
            }
        );

    }

    getCompetitionsByDelegate=(req: express.Request, res: express.Response)=>{
        let delegat=req.body.delegat;
        Competition.find({'delegat': {$all: [delegat]}}, (err, competition)=>{
            if(err) console.log(err);
            else {
                res.json(competition)
            }
        });
    }

    checkIfCandidateApplied=(req: express.Request, res: express.Response) => {
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;
        let vrsta=req.body.vrsta;
        let candidate=req.body.candidate;

        Competition.findOne(
            { 'sport': sport, 'disciplina': disciplina, 'pol': pol, 'vrsta': vrsta, 'prijavljeni': candidate}, 
            (err, competition) => {
                if(err || competition==null) {
                    res.status(200).json({'message': 'not already nominated'});
                }
                else {
                    res.status(200).json({'message': 'already nominated'});
                }
            }
        );
    }

    setTimeAndLocationTennis=(req: express.Request, res: express.Response)=>{
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;
        let vrsta=req.body.vrsta;
        let vremena=req.body.vremena;
        let lokacija=req.body.lokacija;

        Competition.findOneAndUpdate(
            { 'sport': sport, 'disciplina': disciplina, 'pol': pol, 'vrsta': vrsta }, 
            { $push: {vremena: vremena}, 'lokacija': lokacija },
            (err, success)=> {
                if(err) {
                    res.status(400).json({'message': 'error setting time and location'});
                }
                else {
                    console.log(success);
                    res.status(200).json({'message': 'set time and location'});
                }
            }
        );
    }

    checkTimeAndLocationTennis=(req:express.Request, res: express.Response) => {
        let vremena=req.body.vremena;
        let lokacija=req.body.lokacija;

        Competition.findOne(
            {'vremena': vremena, 'lokacija': lokacija}, (err, competition) => {
                if(err || competition==null) {
                    res.status(200).json({'message': 'free'});
                }
                else {
                    res.status(200).json({'message': 'not free'});
                }
            }
        );

    }

}


