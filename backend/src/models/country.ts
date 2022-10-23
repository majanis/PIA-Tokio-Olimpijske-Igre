import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Country=new Schema(
    {
        name: {
            type: String
        },
        gold: {
            type: Number
        },
        silver: {
            type: Number
        },
        bronze: {
            type: Number
        },
        total: {
            type: Number
        },
        athletes: {
            type: Number
        }
        
    }
);


export default mongoose.model('Country', Country, 'countries');

