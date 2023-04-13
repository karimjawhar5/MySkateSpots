import express from "express"
const app = express()

import users from './routes/users.js';

app.use("/api/users", users)

app.listen(8080, ()=>{
    console.log("API running on port 8080")
})