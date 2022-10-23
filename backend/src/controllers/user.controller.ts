import express from 'express';
import User from '../models/user';

export class UserController{
    login=(req: express.Request, res: express.Response) => {
        let username=req.body.username;
        let password=req.body.password;
    

    User.findOne({'username': username, 'password': password},
    (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    }
    
    )
}

    register=(req:express.Request, res: express.Response) => {
        let user= new User(req.body);
        user.save().then((user)=>{
            res.status(200).json({'message': 'User added!'});
        }).catch((err)=>{
            res.status(400).json({'message': 'User not added'});
        });
    }

    getCountryDelegateLeader=(req: express.Request, res:express.Response) => {
        let nacionalnost=req.body.nacionalnost;
        let type='vodja';

        User.findOne({'nacionalnost': nacionalnost, 'type': type},
        (err, user)=>{
        if(err || user==null) {
            res.status(200).json({'message':'doesnt exist'});
            
        }
        else {
            res.status(200).json({'message':'exists'});
            console.log(user);
        }
    }
    );
    }

    getAllDelegates=(req: express.Request, res: express.Response) => {
        let type='delegat';
        User.find({'type': type}, 
        (err, user)=> {
            if(err || user==null) {
                res.status(200).json({'message':'doesnt exist'});        
        }
        else {
           res.json(user);
        }
    }
        );
    }

    getDelegateByName=(req: express.Request, res: express.Response) =>{
        let type='delegat';
        let imeprezime=req.body.imeprezime;
        User.find({'type': type, 'imeprezime': imeprezime}, 
        (err, user)=> {
            if(err || user==null) {
                res.status(200).json({'message':'doesnt exist'});        
        }
        else {
           res.json(user);
        }
    }
        );
    }

    checkIfUsernameTaken=(req: express.Request, res: express.Response) =>{
        let username=req.body.username;

        User.findOne({'username': username}, (err, user) =>{
            if(err || user==null) {
                res.status(200).json({'message': 'username available'});
            }
            else {
                res.status(200).json({'message': 'username taken'});
            }
        }

        );
    }

    changePassword=(req: express.Request, res: express.Response) =>{
        let username= req.body.username;
        let password=req.body.password;
        let newpassword=req.body.newpassword;

        User.findOneAndUpdate({'username': username, 'password': password}, {'password': newpassword}, (err, user) =>{
            if(err) {
                res.status(400).json({'message': 'error'});
            }
            else {
                res.status(200).json({'message': 'successful change'});
            }
        }
        );
    }

}