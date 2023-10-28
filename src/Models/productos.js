const mongoose = require("mongoose");

const productoSchemma = new mongoose.Schema({
  name: String,
});

const Producto = mongoose.model("Producto", productoSchemma);

module.exports = Producto;
