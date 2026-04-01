const express = require("express");
const userController = require("../controllers/User");
const protect = require("../middleware/auth");

const router = express.Router();

router.post("/", userController.create);
router.post("/login", userController.login);

// 🔥 JOGO
router.get("/balance", protect, userController.balance);
router.post("/bet", protect, userController.bet);
router.post("/play", protect, userController.play);

// 🔥 NOVAS
router.get("/history", protect, async (req, res) => {
  const Bet = require("../models/Bet");

  const bets = await Bet.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(bets);
});

router.get("/ranking", async (req, res) => {
  const User = require("../models/User");

  const ranking = await User.find()
    .sort({ balance: -1 })
    .limit(10)
    .select("name balance");

  res.json(ranking);
});

// ⚠️ SEMPRE POR ÚLTIMO
router.put("/:id", protect, userController.update);

module.exports = router;