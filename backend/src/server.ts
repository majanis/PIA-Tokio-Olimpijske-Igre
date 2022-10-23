import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import registerRouter from './routes/request.routes';
import countryRouter from './routes/country.routes';
import athleteRouter from './routes/athlete.routes';
import sportRouter from './routes/sport.routes';
import competitionRouter from './routes/competition.routes';
import recordRouter from './routes/record.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/myDb');
const connection=mongoose.connection;
connection.once('open', ()=>{
    console.log('mongo ok');
});

const router=express.Router();
router.use('/users', userRouter);
router.use('/request', registerRouter);
router.use('/country', countryRouter);
router.use('/athlete', athleteRouter);
router.use('/sport', sportRouter);
router.use('/competition', competitionRouter);
router.use('/record', recordRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));