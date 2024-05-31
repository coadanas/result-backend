const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())

const port = 3000;

app.get("/", (req, res)=>{
  res.send("hello")
})

// userModel
const userModel = require("./userModel/userModel.js")

// findResultRoute
const findResultRoute = require("./router/findResultRoute.js")
app.use("/", findResultRoute)

// postResultRoute
const postResultRoute = require("./router/postResultRoute.js")
app.use("/", postResultRoute)

const server = http.createServer(app);
server.listen(port, ()=>{
  console.log(`http;//localhost:${port}`)
})