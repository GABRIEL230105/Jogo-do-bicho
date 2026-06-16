const Sorteio = require("../models/Sorteio");

function gerarMilhar() {
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
}

async function simularSorteio(req, res) {
  try {
    const premios = new Set();

    while (premios.size < 5) {
      premios.add(gerarMilhar());
    }

    const resultado = [...premios];

    const sorteio = await Sorteio.create({
      primeiroPremio: resultado[0],
      segundoPremio: resultado[1],
      terceiroPremio: resultado[2],
      quartoPremio: resultado[3],
      quintoPremio: resultado[4],
    });

    return res.status(201).json(sorteio);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao gerar sorteio",
    });
  }
}

async function ultimoSorteio(req, res) {
  try {
    const sorteio = await Sorteio.findOne().sort({
      createdAt: -1,
    });

    return res.json(sorteio);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao buscar sorteio",
    });
  }
}

module.exports = {
  simularSorteio,
  ultimoSorteio,
};