const authMiddleware = require('../Middleware/authMiddleware.js')
const express = require('express');
const loginModel = require("../userModel/loginModel.js")
const userAuthorization = express.Router();

userAuthorization
.route("/user")
.get(authMiddleware, getUserData)

async function getUserData(req, res){
  try{
    const data = req.user;
    console.log("login user data: ", data);
    return res.json({data})
  }catch(err){
     console.log("error userAuthorization", err)
  }
}

module.exports = userAuthorization;