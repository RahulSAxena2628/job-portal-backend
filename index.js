import express from 'express';
import cookieParser from 'cookie-parser';   
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRouter from './route/user.route.js';
import companyRouter from './route/company.route.js';
import applicationRouter from './route/application.route.js';
import jobRouter from './route/job.route.js';
dotenv.config({});

let port=process.env.PORT || 3000;

app.get('/home', (req, res) => {
   return res.status(200).json({
    message:'i am doming from backend',
    success:true
   });
});

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin: ['http://localhost:5173', 'https://hoppscotch.io'],
    credentials: true,
};

app.use(cors(corsOptions));


//apis
app.use('/api/v1/user', userRouter);
app.use('/api/v1/company', companyRouter);
app.use('/api/v1/job', jobRouter);
app.use('/api/v1/application', applicationRouter);


app.listen(port, () => {
    connectDB()
  console.log(`Server is running on port ${port}`);
});