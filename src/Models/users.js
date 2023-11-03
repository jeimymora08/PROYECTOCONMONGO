const mongoose = require("mongoose");

const CompradoresSchemma = new mongoose.Schema({
  name: String,
});

const Usuario = mongoose.model("Usuario", CompradoresSchemma);

module.exports = Usuario;