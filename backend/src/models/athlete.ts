import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Athlete=new Schema(
    {
        imeprezime: {
            type: String
        },
        pol: {
            type: String
        },
        sport: {
            type: String
        },
        discipline: {
            type: Array
        },
        nacionalnost: {
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
        rezultat: {
            type: String
        }
        
    }
);


export default mongoose.model('Athlete', Athlete, 'athletes');

