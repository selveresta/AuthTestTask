import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routes/mainRouter';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import coockieParser from 'cookie-parser';
import errorHandler from './middlewares/error-middleware';
dotenv.config();

const DB_URL = `mongodb+srv://artemonlypnyk1214:${process.env.DB_PASSWORD}@telegramcluster.vuzvn1w.mongodb.net/TestTask`;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(coockieParser());
app.use(cors());

app.use(router);
app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect(DB_URL);
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error) {}
};

start();
