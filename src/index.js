import express, { json, urlencoded } from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/dbConnect.js';

dotenv.config();
dbConnect();

const app = express();

// Middleware
const corsOptions = {
    origin: 'http://localhost:3001', // Adjust as needed
    credentials: true,
};
app.use(cors(corsOptions));

app.use(json({limit: "100mbs"}));
app.use(urlencoded({limit: "100mbs", extended: true}));
app.use(
    session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 600 * 60
    } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());


//Routes

//Listen
const PORT = process.env.PORT || 7002;

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});