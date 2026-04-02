const express = require("express");
const userController = require("../controllers/User");
const protect = require("../middleware/auth");

const router = express.Router();

// 🔐 AUTH

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Autenticação]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Gabriel Mendes"
 *             email: "gabriel@email.com"
 *             password: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post("/", userController.create);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Autenticação]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "teste@email.com"
 *             password: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Credenciais inválidas
 */
router.post("/login", userController.login);

// 💰 SALDO / JOGO

/**
 * @swagger
 * /users/balance:
 *   get:
 *     summary: Retorna o saldo do usuário
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Saldo retornado com sucesso
 */
router.get("/balance", protect, userController.balance);

/**
 * @swagger
 * /users/play:
 *   post:
 *     summary: Realiza uma aposta
 *     tags: [Apostas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 10
 *             tipo: "grupo"
 *             aposta: "01"
 *     responses:
 *       200:
 *         description: Aposta realizada com sucesso
 */
router.post("/play", protect, userController.play);

/**
 * @swagger
 * /users/bet:
 *   post:
 *     summary: Realiza uma aposta simples
 *     tags: [Apostas]
 */
router.post("/bet", protect, userController.bet);

// 🆕 DEPÓSITO

/**
 * @swagger
 * /users/deposit:
 *   post:
 *     summary: Realiza um depósito
 *     tags: [Financeiro]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             value: 100
 *     responses:
 *       200:
 *         description: Depósito realizado com sucesso
 */
router.post("/deposit", protect, userController.deposit);

// 📜 HISTÓRICO

/**
 * @swagger
 * /users/history:
 *   get:
 *     summary: Retorna o histórico de apostas
 *     tags: [Apostas]
 */
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

/**
 * @swagger
 * /users/ranking:
 *   get:
 *     summary: Retorna o ranking dos usuários
 *     tags: [Usuários]
 *     security: []
 */
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

// ⚠️ UPDATE

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza dados do usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 */
router.put("/:id", protect, userController.update);

module.exports = router;