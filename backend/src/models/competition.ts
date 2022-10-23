import mongoose from 'mongoose';
import user from './user';

const Schema=mongoose.Schema;

let Competition=new Schema(
    {
        sport: {
            type: String
        },
        disciplina: {
            type: String
        },
        pol: {
            type: String
        },
        vrsta: {
            type: String
        },
        pocetak: {
            type: String
        },
        kraj: {
            type: String
        },
        lokacija: {
            type: String
        },
        delegat: {
            type: Array
        },
        takmicari: {
            type: Array
        },
        prijavljeni: {
            type: Array
        },
        pobednik: {
            type: String
        },
        format: {
            type: String
        },
        brojTakmicaraMin: {
            type: Number
        },
        brojTakmicaraMax: {
            type: Number
        },
        drugi: {
            type: String
        },
        treci: {
            type: String
        },
        potvrdjeno: {
            type: Boolean
        },
        zavrseno: {
            type: Boolean
        }
    }
);


export default mongoose.model('Competition', Competition, 'competitions');

