import express from "express"

const router = express.Router()

router.get("/approve",(req, res)=> res.send('approve'))
router.get("/denny",(req, res)=> res.send('denny'))
router.get("/nutral",(req, res)=> res.send('nutral'))

export default router