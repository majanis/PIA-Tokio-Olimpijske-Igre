import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Request=new Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String
        },
        imeprezime: {
            type: String
        },
        nacionalnost: {
            type: String
        },
        email: {
            type: String
        },
        type: {
            type: String
        }
        
    }
);


export default mongoose.model('Request', Request, 'requests');

