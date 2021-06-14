const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Avaliacao');
const Avaliacao = mongoose.model('avaliacao');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});

mongoose.connect('mongodb://localhost/celke', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
  console.log("Conexão com MongoDB falhou!");
});

app.get("/listar", (req, res) => {
  Avaliacao.find({}).then((avaliacao) => {
    return res.json(avaliacao);
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhuma avaliação encontrada!"
    });
  });
});

app.get("/avaliacao/:id", (req, res) => {

  Avaliacao.findOne({ _id: req.params.id  }).then((avaliacao) => {
    return res.json(avaliacao);
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Não foi possível encontrar a avaliação!"
    });
  });
});

app.post("/cadastrar", (req, res) => {
  const avaliacao = Avaliacao.create(req.body, (err) => {
    if (err) return res.status(400).json({
      error: true,
      message: "Erro: Avaliação não foi cadastrada no banco de dados."
    });

    return res.status(200).json({
      error: false,
      message: "Avaliação cadastrada com sucesso!"
    });
  });
});

app.put("/alterar/:id",  (req, res) => {
  const avaliacao = Avaliacao.updateOne({ _id: req.params.id }, req.body, (err) => {
    if (err) return res.status(400).json({
      error: true,
      message: "Erro: Avaliação não foi editada no banco de dados."
    });

    return res.status(200).json({
      error: false,
      message: "Avaliação editada com sucesso!"
    });
  });
});

app.delete("/deletar/:id",  (req, res) => {
  const avaliacao = Avaliacao.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return res.status(400).json({
      error: true,
      message: "Erro: Avaliação não foi excluida do banco de dados."
    });

    return res.status(200).json({
      error: false,
      message: "Avaliação excluida com sucesso!"
    });
  });
});

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080: http://localhost:8080/");
});