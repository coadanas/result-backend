const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

var corsOptions = {
  origin: 'https://krishnainstitute.onrender.com',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())

const port = 3000;

// userModel
const userModel = require("./userModel/userModel.js")
const loginModel = require("./userModel/loginModel.js")

app.get("/", (req, res)=>{
  res.send("hello")
})

app.post("/", async(req, res)=>{
const obj = req.body;
const usedata = await loginModel.create(obj)
res.json({
  messgae: "login info pushed",
  data: usedata
})
console.log("login data", usedata)
})

// findResultRoute
const findResultRoute = require("./router/findResultRoute.js")
app.use("/", findResultRoute)

// postResultRoute
const postResultRoute = require("./router/postResultRoute.js")
app.use("/", postResultRoute)

// userAuthorization
const userAuthorization = require("./router/userAuthorization.js")
app.use("/", userAuthorization)

// loginRouter
const loginRouter = require("./router/Login.js")
app.use("/", loginRouter)

const server = http.createServer(app);
server.listen(port, ()=>{
  console.log(`http;//localhost:${port}`)
})
