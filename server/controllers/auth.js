import bcrypt from 'bcrypt'
import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const login = (req, res) => {
  var q = "SELECT * FROM users WHERE email = ?"
  db.query(q, [req.body.email], (err, data)=>{
    if (err) return res.status(500).send(err)
    if (data.length ==  0) return res.status(404).send('no email found')

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
    if (!checkPassword) return res.status(400).send('username or password incorrect')
    const token = jwt.sign({ id: data[0].id }, "secretkey")
    const {password, ...others} = data[0]
    res.cookie("accessToken", token, {
      httpOnly: true //
    }).status(200).send(others)
  })
}

  export const register = (req, res) => {
    var q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) =>{
      if (err) return res.status(500).send(err)
      if (data.length) return res.status(209).send('user already exists')
  
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt)
  
      q = "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)"
      db.query(q, [req.body.name, req.body.username, req.body.email, hashedPassword], (err, data)=>{
        if (err) return res.status(500).send(err) 
        else{
          return res.status(200).send('user has been created');
        }
      })
    })
  }

export const logout = (req, res) => {
  res.clearCookie("acessToken",{
    secure: true,
    sameSite: "none"
  }).status(200).send("user has been logged out")
}
