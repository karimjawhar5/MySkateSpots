import express from "express"
const app = express()

import * as dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'

import session from 'express-session'
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false
}))

import passport from 'passport';
import { getUserByEmail, getUserByUsername } from './database.js';
import { initialize } from './passport-config.js';
app.use(passport.initialize());
app.use(passport.session());

initialize(passport, getUserByEmail, getUserByUsername);

import bodyParser from "body-parser"
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

import usersRoute from './routes/users.js';
import postsRoute from './routes/posts.js';
import authRoute from './routes/auth.js';
import savedRoute from './routes/saved.js';
import testRoute from './routes/test.js';

app.use("/api/users", usersRoute)
app.use("/api/posts", postsRoute)
app.use("/api/saved", savedRoute)
app.use("/api/auth", authRoute)
app.use("/api/test", testRoute)

app.listen(8080, ()=>{
    console.log("API running on port 8080")
})