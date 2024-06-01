const mongoose = require('mongoose')
const JWT = require("jsonwebtoken")

const secrateCode = "ANASJSONWEBTOKENKEY";

const userSchema = mongoose.Schema({
email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  isAdmin: Boolean,
})

userSchema.methods.generateToken = async function (){
  return JWT.sign(
    {
    userId: this._id.toString(),
    email: this.email,
    isAdmin: this.isAdmin,
  },
  secrateCode,
  {
    expiresIn : "30d"
  }
  )
}

const loginModel = mongoose.model("resultadmin", userSchema);

module.exports = loginModel;