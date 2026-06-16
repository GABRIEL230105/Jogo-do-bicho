const express = require("express");
const userController = require("../controllers/User");
const sorteioController = require("../controllers/Sorteio");
const protect = require("../middleware/auth");

const router = express.Router();

// 🔐 AUTH

router.post("/", userController.create);
router.post("/login", userController.login);

// 💰 SALDO / JOGO

router.get("/balance", protect, userController.balance);

router.post("/play", protect, userController.play);

router.post("/bet", protect, userController.bet);

// 🆕 DEPÓSITO

router.post("/deposit", protect, userController.deposit);

// 📜 HISTÓRICO

router.get("/history", protect, async (req, res) => {
  try {
    const Bet = require("../models/Bet");

    const bets = await Bet.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(bets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar histórico" });
  }
});

// 🏆 RANKING

router.get("/ranking", async (req, res) => {
  try {
    const User = require("../models/User");

    const ranking = await User.find()
      .sort({ balance: -1 })
      .limit(10)
      .select("name balance");

    res.json(ranking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar ranking" });
  }
});

// 🎲 SORTEIOS

router.post(
  "/sorteio/simular",
  protect,
  sorteioController.simularSorteio
);

router.get(
  "/sorteio/ultimo",
  sorteioController.ultimoSorteio
);

// ⚠️ UPDATE

router.put("/:id", protect, userController.update);

module.exports = router;