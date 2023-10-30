const express = require("express"); 
const cors = require("cors");
const app = express(); 
const port = 3000; 
require("./db.js"); 
app.use(express.json()); 
app.use(cors());
const Producto = require("./Models/productos"); 
const User = require("./Models/Users");
app.get("/", (req, res) => {
  res.send(
    "MORISGARPRODUCTOS"
  );
});

app.get("/user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email: email })
    if (!userFound) {
      res.status(400).send("El email ingresado no es correcto");
    }
    const matchedPassword = await User.comparePassword(
      password,
      userFound.password
    );
    if (!matchedPassword) {
      res.status(400).send("La contraseña ingresada no es correcta");
    }


    res.status(200).json(userFound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/producto", (req, res) => {
  const name = req.query.name;
  const nuevoProducto = producto.create({ name: name });
  res.json("Producto creado correctamente");
});

app.post("/user", async (req, res) => {
  const {
    username,
    email,
    identification_number,
    password,
    phone_number,
    cats, // ["Roberto", "Esteban"]
  } = req.body;

  const catsFound = await Gatito.find({ name: { $in: cats } });

  /* crear la instancia del usuario */
  const user = new User({
    username: username,
    email: email,
    identification_number: identification_number,
    password: password, //123456 =>cambia por el hash de encryptPassword()
    phone_number: phone_number,
    cats: catsFound.map((cat) => cat._id), //=> [new ObjectId("651cb3a8f62c611047c7be57"),new ObjectId("651cb3b5f62c611047c7be59"),]
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

/* -------------------------------- */
module.exports = { app, port };
