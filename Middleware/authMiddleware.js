const JWT = require('jsonwebtoken');
const express = require('express');
const loginModel = require("../userModel/loginModel.js")

const secrateCode = "ANASJSONWEBTOKENKEY";

const authMiddleware= async(req, res, next)=>{
  const token = req.header("Authorization")
  if(!token || !token.startsWith("Bearer")){
    return res.json({
      message: "Unauthorized HTTP, token not provided"
    }).status(401)
  }
  const jwtToken = token.replace("Bearer", "").trim();
  
  try{
    const isVerified = JWT.verify(jwtToken, secrateCode)
    const userData = await userModel.findOne({email: isVerified.email}).select({password: 0})
    
    req.userId = userData._id;
    req.user = userData;
    req.token = token;
    
    next()
    
  }catch(err){
    return res.json({
      message: "Unauthorized. Invalid token.",
      error: err
    }).status(401)
  }
}

module.exports = authMiddleware;