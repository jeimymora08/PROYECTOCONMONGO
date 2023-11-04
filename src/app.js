const express = require("express"); 
const cors = require("cors");
const app = express(); 
const port = 3000; 
require("./db.js"); 
app.use(express.json()); 
app.use(cors());
const Producto = require("./Models/productos"); 
const User = require ("./Models/Users.js");

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


app.post("/user", async (req, res) => { 
  const {
    username,
    email,
    identification_number,
    password,
    phone_number,
    products, // ["Roberto", "Esteban"]
  } = req.body;

  const productsFound = await Producto.find({ name: { $in: products } });
  console.log("productsFound",productsFound);





  /* crea"r la instancia del usuario */
  const user = new User({
    username: username,
    email: email,
    identification_number: identification_number,
    password: password, //123456 =>cambia por el hash de encryptPassword()
    phone_number: phone_number,
    products: productsFound.map((product) => product._id), //=> [new ObjectId("651cb3a8f62c611047c7be57"),new ObjectId("651cb3b5f62c611047c7be59"),]
  });
  /* Debemos encriptar la contraseña */
  user.password = await User.encryptPassword(password);

  /* Guardo en la base de datos */
  const newUser = user.save();
 
  res.status(200).json({
    _id: newUser._id,
    username: newUser.username,
    mail: newUser.email,
  });
});


module.exports = { app, port };