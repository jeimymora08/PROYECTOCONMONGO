const mongoose = require("mongoose"); /* importo el módulo de mongoose */

async function connection() {
  await mongoose.connect(
      "mongodb+srv://jeimyandrea08:19541985@loginmygconfecciones.heawbcm.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(console.log("Base de datos Mongo conectada"))
    .catch(err) {
      console.error("error al conectar con el servidor:",err);
    }
}

module.exports = { connection };
