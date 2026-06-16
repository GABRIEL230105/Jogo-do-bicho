const express = require("express");
const userController = require("../controllers/User");
const sorteioController = require("../controllers/Sorteio");
const protect = require("../middleware/auth");

const router = express.Router();

// 🔐 AUTH

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
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
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", userController.login);

// 💰 SALDO / JOGO

/**
 * @swagger
 * /users/balance:
 *   get:
 *     summary: Retorna o saldo do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Saldo retornado com sucesso
 */
router.get("/balance", protect, userController.balance);

/**
 * @swagger
 * /users/play:
 *   post:
 *     summary: Realiza uma jogada
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jogada realizada com sucesso
 */
router.post("/play", protect, userController.play);

/**
 * @swagger
 * /users/bet:
 *   post:
 *     summary: Realiza uma aposta
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Aposta realizada com sucesso
 */
router.post("/bet", protect, userController.bet);

// 🆕 DEPÓSITO

/**
 * @swagger
 * /users/deposit:
 *   post:
 *     summary: Realiza um depósito
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *     summary: Retorna o histórico de apostas do usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Histórico retornado com sucesso
 */
router.get("/history", protect, async (req, res) => {
  try {
    const Bet = require("../models/Bet");
    const bets = await Bet.find({ user: req.user._id }).sort({ createdAt: -1 });
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
 *     summary: Retorna o ranking dos usuários por saldo
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Ranking retornado com sucesso
 */
router.get("/ranking", async (req, res) => {
  try {
    const User = require("../models/User");
    const ranking = await User.find().sort({ balance: -1 }).limit(10).select("name balance");
    res.json(ranking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar ranking" });
  }
});

// 🎲 SORTEIOS

/**
 * @swagger
 * /users/sorteio/simular:
 *   post:
 *     summary: Simula um sorteio
 *     tags: [Sorteio]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sorteio simulado com sucesso
 */
router.post("/sorteio/simular", protect, sorteioController.simularSorteio);

/**
 * @swagger
 * /users/sorteio/ultimo:
 *   get:
 *     summary: Retorna o último sorteio realizado
 *     tags: [Sorteio]
 *     responses:
 *       200:
 *         description: Último sorteio retornado com sucesso
 */
router.get("/sorteio/ultimo", sorteioController.ultimoSorteio);

// ⚠️ UPDATE

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
router.put("/:id", protect, userController.update);

module.exports = router;