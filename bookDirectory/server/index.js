import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './utils/db.js';
import {default as authRoutes} from './routes/authRoutes.js'
import {default as bookRoutes} from './routes/bookRoutes.js'
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api",authRoutes)
app.use("/api",bookRoutes)

app.all('*',(req,res,next)=>{
    next(new AppError(`Not found ${req.originalUrl}`),401)
});

app.use(globalErrorHandler)


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})