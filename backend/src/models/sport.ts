import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Sport=new Schema(
    {
        ime: {
            type: String
        },
        discipline: {
            type: Array
        },
        vrsta: {
            type: String
        },
        maxIgraca: {
            type: Number
        },
        minIgraca: {
            type: Number
        }
        
    }
);


export default mongoose.model('Sport', Sport, 'sports');

