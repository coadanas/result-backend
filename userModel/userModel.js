const mongoose = require('mongoose')

const DB_URL = "mongodb+srv://anas:anas@food.t6wubmw.mongodb.net/foodApp?retryWrites=true&w=majority&appName=food";

mongoose.connect(DB_URL)
.then(()=>console.log("db connected...."))
.catch((err)=>console.log(err))

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
   roll: {
    type: Number,
    required: true,
    unique: true
  },
  subject: String,
  marks: Number,
})

const userModel = mongoose.model("result", userSchema);

module.exports = userModel;