import express from "express"
import {getUsers} from "../controllers/users.js"

const router = express.Router()

router.get("/test", getUsers)

export default router