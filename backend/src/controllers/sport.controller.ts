import express from 'express';
import Sport from '../models/sport';

export class SportController{
    getAllSports=(req: express.Request, res:express.Response) => {
        Sport.find({}, (err, sports)=>{
            if(err) console.log(err);
            else {
                res.json(sports)
            }
        });
    }


insertSport=(req:express.Request, res: express.Response) => {
    let sport= new Sport(req.body);
    sport.save().then((sport)=>{
        res.status(200).json({'message': 'Sport added!'});
    }).catch((err)=>{
        res.status(400).json({'message': 'Sport not added'});
    });
}


getSport=(req:express.Request, res:express.Response) => {
    let ime=req.body.ime;
    let vrsta=req.body.vrsta;
    console.log(ime, vrsta);

    Sport.findOne({'ime': ime, 'vrsta': vrsta},
    (err, sport)=>{
        if(err || sport==null) {
            res.status(200).json({'message': 'sport not in db'});
            
        }
        else {
            res.status(200).json({'message': 'sport in db'});
            console.log(sport);
        }
    }
    );

}

addDisciplineToSport=(req: express.Request, res: express.Response) => {
    let ime=req.body.ime;
    let disciplina=req.body.disciplina;
    let vrsta=req.body.vrsta;

    console.log(disciplina);

    Sport.findOneAndUpdate(
        { 'ime': ime, 'vrsta': vrsta }, 
        { $push: {discipline: disciplina} },
        (err, success)=> {
            if(err) {
                res.status(400).json({'message': 'error adding discipline'});
            }
            else {
                console.log(success);
                console.log(disciplina);
                res.json({'message': 'added discipline'});
            }
        }
         );

}

getAllDisciplines=(req: express.Request, res: express.Response) => {
    
    Sport.find({}, (err, sports)=>{
    if(err) console.log(err);
    else {
        res.json(sports)
    }
}
);
}

}
