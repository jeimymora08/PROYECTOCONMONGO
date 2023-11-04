const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const UserSchemma = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  identification_number: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
   },
   products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Producto" }], //productos por usuario//
});

UserSchemma.statics.encryptPassword = async (password)=>{
  const salt = await bcrypt.genSalt(10) //cantidad de rondas que va a dar el encriptado a mi password
  return await bcrypt.hash(password,salt) //=> 153asd46wer6asfg (devuelve algo encriptado)
  }
  
  UserSchemma.statics.comparePassword = async (password, receivedPassword)=>{
  return await bcrypt.compare(password, receivedPassword)  //=> true o false
  }
  
  const User = mongoose.model("User", UserSchemma);
  
  module.exports = User;
  