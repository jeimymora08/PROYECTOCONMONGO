const express = require("express"); 
const cors = require("cors");
const app = express(); 
const port = 3000; 
require("./db.js"); 
app.use(express.json()); 
app.use(cors());
const Producto = require("./Models/productos"); 
const Usuario = require ("./Models/Users.js");

//rutas del programa//

app.get("/", (req, res) => {
  res.send("MORISGARPRODUCTOS");
});

app.post("/Producto", async  (req, res) => {
  const name = req.query.name;
  let producto = new Producto ({name : name});
  const nuevoProducto =  await  producto.save({ name: name });
  res.json("Producto creado correctamente");
});


app.post("/Usuario", async  (req, res) => {
  const name = req.query.name;
  let usuario = new Usuario ({name : name});
  const nuevoUsuario =  await  Usuario.create({ name: name });
  res.json("Usuario creado correctamente");
});



module.exports = { app, port };