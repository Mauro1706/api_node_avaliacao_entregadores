const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});

app.use(routes);

app.listen(8004, () => {
  console.log("Servidor iniciado na porta 8004: http://localhost:8004/");
});