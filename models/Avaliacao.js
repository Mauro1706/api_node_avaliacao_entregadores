const mongoose = require('mongoose');

const Avaliacao = new mongoose.Schema({
  avaliacao: { type: Number, default: 0, require: true },
  nomeEntregador: { type: String, require: true },
  nomeAvaliador: { type: String, require: false },
  observacao: { type: String, require: false },
  data: { type: Date, default: Date.now },
},
{
  timestamps: true,
});

mongoose.model('avaliacao', Avaliacao);