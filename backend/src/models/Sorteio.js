const mongoose = require("mongoose");

const sorteioSchema = new mongoose.Schema(
  {
    primeiroPremio: {
      type: String,
      required: true,
    },
    segundoPremio: {
      type: String,
      required: true,
    },
    terceiroPremio: {
      type: String,
      required: true,
    },
    quartoPremio: {
      type: String,
      required: true,
    },
    quintoPremio: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sorteio", sorteioSchema);