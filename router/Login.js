const express = require('express')
const loginModel = require("../userModel/loginModel.js")
const loginRouter = express.Router();

loginRouter
.route("/login")
.post(getLogin)

async function getLogin(req, res){
  const {email, password} = req.body;
  try{
    const existUser = await loginModel.findOne({email});
    
    if(!existUser){
       console.log("user not exist")
      return res.json({message: "user not exist"})
    }
    if(password !== existUser.password){
       return res.json({
         message: "password not match"
       })
    }
    const token = await existUser.generateToken()
    const userId = existUser._id.toString();
    
      return res.json({
      message: "login successfuly.",
      userId: userId,
      token: token,
      user: existUser
    })
    console.log({
      message: "login successfuly.",
      userId: userId,
      token: token,
      user: existUser
    })
  }catch(err){
    console.log("login error", err)
  }
}

console.log("login: http://localhost:3000/login")
module.exports = loginRouter;