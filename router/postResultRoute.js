const express = require('express')
const userModel = require("../userModel/userModel.js")
const postResultRoute = express.Router();

postResultRoute
.route("/add/result")
.get(getResult)
.post(addResult)

function getResult(req, res){
  res.send("post result")
}

async function addResult(req, res){
  let {name, roll, subject, marks} = req.body;
      const existUser = await userModel.findOne({ name, roll });
        if (existUser) {
            return res
                .status(401)
                .json({ message: "user already registerd, try to login" });
        }
   
 try{
  let response = await userModel.create({name, roll, subject, marks});
  console.log(response)
  return res.json({
    message: "Result Added...",
    data: response
  })
 }
 catch(err){
   return res.json({
    message: "use unique name and roll"
   })
}
}

module.exports = postResultRoute;