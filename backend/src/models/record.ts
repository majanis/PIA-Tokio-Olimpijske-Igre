import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Record=new Schema(
    {
        godina: {
            type: String
        },
        mesto: {
            type: String
        },
        takmicar: {
            type: String
        },
        disciplina: {
            type: String
        },
        nacionalnost: {
            type: String
        },
        vrednost: {
            type: String
        },
        sport: {
            type: String
        }
        
    }
);


export default mongoose.model('Record', Record, 'records');

