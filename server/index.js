import * as dotenv from 'dotenv'
import express from "express"

const app = express()

import usersRoute from './routes/users.js';
import postsRoute from './routes/posts.js';
import authRoute from './routes/auth.js';
import savedRoute from './routes/saved.js';

import cors from 'cors'
import cookieParser from 'cookie-parser'

//middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/users", usersRoute)
app.use("/api/posts", postsRoute)
app.use("/api/saved", savedRoute)
app.use("/api/auth", authRoute)

app.listen(8080, ()=>{
    console.log("API running on port 8080")
})