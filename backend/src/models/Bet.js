const mongoose = require("mongoose");

const betSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔥 tipo da aposta
    tipo: {
      type: String,
      enum: ["grupo", "dezena", "milhar"],
      required: true,
    },

    // 💰 valor apostado
    valor: {
      type: Number,
      required: true,
    },

    // 🎯 aposta do usuário (STRING pra manter 00, 0000 etc)
    aposta: {
      type: String,
      required: true,
    },

    // 🎲 número sorteado (sempre 4 dígitos)
    numeroSorteado: {
      type: String,
      required: true,
    },

    // 🐾 grupo sorteado (opcional, mas útil)
    grupoSorteado: {
      type: String,
    },

    ganhou: {
      type: Boolean,
      required: true,
    },

    // 🏆 valor ganho
    premio: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bet", betSchema);