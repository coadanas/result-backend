const express = require('express');
const findResultRoute = express.Router();
const userModel = require("../userModel/userModel.js")
  
findResultRoute
.route("/result")
.get(getResult)
.post(findResult)

function getResult(req, res){
  res.send("your result")
}
async function findResult(req, res){
  const {name, roll} = req.body;
  const response = await userModel.findOne({roll, name})
  if(!response){
     return res.json({
    message: "invalid data",
    data: response
  })
  }
  try{
  console.log(response)
  return res.json({
    message: "your result",
    data: response
  })
}catch(err){
   return res.json({
    message: "use unique name",
    error: err
   })
}
}

module.exports = findResultRoute;