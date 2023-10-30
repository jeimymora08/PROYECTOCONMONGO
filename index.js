const { app, port } = require("./src/app");
const { connection } = require("./src/db");


connection().then(
  app.listen(port, () => {
    console.log(`Servidor levantado en el puerto: ${port}`);
  })
);
