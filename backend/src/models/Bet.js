const mongoose = require("mongoose");

const betSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tipo: {
      type: String,
      enum: ["grupo", "dezena", "milhar"],
      required: true,
    },

    valor: {
      type: Number,
      required: true,
    },

    aposta: {
      type: String,
      required: true,
    },

    // 🎲 Os 5 resultados do sorteio
    numerosSorteados: {
  type: [String],
  default: [],
},

gruposSorteados: {
  type: [String],
  default: [],
},

numeroSorteado: {
  type: String,
},

grupoSorteado: {
  type: String,
},

ganhou: {
  type: Boolean,
  required: true,
},

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