const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Importar y usar las rutas
const routes = require('./routes');
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});