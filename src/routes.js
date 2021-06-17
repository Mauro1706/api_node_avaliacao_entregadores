const express = require('express');
const mongoose = require('mongoose');
//const jwt = require('jsonwebtoken');

const router = express.Router();

require('../models/Avaliacao');
const Avaliacao = mongoose.model('avaliacao');

mongoose.connect('mongodb://localhost/autenticate', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Conexão com MongoDB falhou!");
});

router.get("/listar", (req, res) => {
    Avaliacao.find({}).then((avaliacao) => {
        return res.json(avaliacao);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhuma avaliação encontrada!"
        });
    });
});

router.get("/buscar/:id", (req, res) => {

    Avaliacao.findOne({ _id: req.params.id  }).then((avaliacao) => {
        return res.json(avaliacao);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível encontrar a avaliação!"
        });
    });
});

router.post("/cadastrar", (req, res) => {
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

router.put("/alterar/:id",  (req, res) => {
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

router.delete("/deletar/:id",  (req, res) => {
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

module.exports = router;
