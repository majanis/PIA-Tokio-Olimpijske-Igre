import express from 'express';
import Record from '../models/record';

export class RecordController{
    getAllRecords=(req: express.Request, res:express.Response) => {
        Record.find({}, (err, records)=>{
            if(err) console.log(err);
            else {
                res.json(records)
            }
        });
    }

}


