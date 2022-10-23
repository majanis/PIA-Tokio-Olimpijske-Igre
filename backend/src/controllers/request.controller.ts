import express from 'express'
import Request from '../models/request';

export class RequestController{

register=(req:express.Request, res: express.Response) => {
    let request= new Request(req.body);
    request.save().then((request)=>{
        res.status(200).json({'message': 'User added!'});
    }).catch((err)=>{
        res.status(400).json({'message': 'User not added'});
    });
}

getRequests=(req: express.Request, res:express.Response)=> {
    Request.find({}, (err, requests)=>{
        if(err) console.log(err);
        else {
            res.json(requests)
        }
    });
}

removeRequest=(req: express.Request, res: express.Response) => {
    //console.log('remove request called!');
    let username=req.body.username;
    let password=req.body.password;
    let nacionalnost=req.body.nacionalnost;

    Request.deleteMany({'username': username, 'password': password, 'nacionalnost': nacionalnost}).then(
        function(){
            console.log("Data deleted"); // Success
            res.status(200).json({'message': 'deleted!'}); //must return result
        }).catch(function(error){
            console.log(error); // Failure
        }
    );
}

removeLeaderRequests=(req: express.Request, res: express.Response) =>{
    let nacionalnost=req.body.nacionalnost;
    let type='vodja';

    Request.deleteMany({'type': type, 'nacionalnost': nacionalnost}).then(
        function(){
            console.log("Data deleted"); // Success
            res.status(200).json({'message': 'deleted!'}); //must return result
        }).catch(function(error){
            console.log(error); // Failure
            res.status(200).json({'message': 'not deleted!'});
        }
    );

}

}
