const User = require("../models/User");
const Bet = require("../models/Bet");
const generateToken = require("../utils/generateToken");
const grupos = require("../utils/bichoGroups");

// função auxiliar
function getGrupoPorDezena(dezena) {
  return grupos.find((g) => g.dezenas.includes(dezena));
}

module.exports = {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: "Usuário já existe!!" });
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email e senha obrigatórios" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Usuário não existe!!" });
      }

      let isMatch = false;

      try {
        isMatch = await user.matchPassword(password);
      } catch (err) {
        console.error("Erro bcrypt:", err);
        return res.status(500).json({ message: "Erro ao validar senha" });
      }

      if (!isMatch) {
        return res.status(400).json({ message: "E-mail ou senha inválidos" });
      }

      return res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          balance: user.balance,
        },
        token: generateToken(user._id),
      });
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  },

  async update(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não existe!!" });
      }

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      const updateUser = await user.save();

      return res.status(200).json(updateUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  },

  async balance(req, res) {
    try {
      const userId = req.user?._id || req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Não autenticado" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.json({ balance: user.balance });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar saldo" });
    }
  },

  async deposit(req, res) {
    try {
      let { value } = req.body;
      value = Number(value);

      const userId = req.user?._id || req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Não autenticado" });
      }

      if (!value || value <= 0) {
        return res.status(400).json({ message: "Valor de depósito inválido" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      user.balance += value;
      await user.save();

      return res.status(200).json({
        message: "Depósito realizado com sucesso",
        balance: user.balance,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao realizar depósito" });
    }
  },

  async bet(req, res) {
    try {
      let { amount } = req.body;

      amount = Number(amount);

      const userId = req.user?._id || req.user?.id;

      if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Valor inválido" });
      }

      if (!userId) {
        return res.status(401).json({ message: "Não autenticado" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      if (user.balance < amount) {
        return res.status(400).json({ message: "Saldo insuficiente" });
      }

      user.balance -= amount;
      await user.save();

      return res.json({
        message: "Aposta realizada",
        balance: user.balance,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro na aposta" });
    }
  },

  async play(req, res) {
    try {
      let { amount, tipo, aposta } = req.body;

      amount = Number(amount);

      const userId = req.user?._id || req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Não autenticado" });
      }

      if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Valor da aposta inválido" });
      }

      if (!tipo || !["grupo", "dezena", "milhar"].includes(tipo)) {
        return res.status(400).json({ message: "Tipo de aposta inválido" });
      }

      if (!aposta) {
        return res.status(400).json({ message: "Aposta não informada" });
      }

      aposta = String(aposta).trim();

      if (tipo === "grupo") {
        const grupoNumero = Number(aposta);

        if (!Number.isInteger(grupoNumero) || grupoNumero < 1 || grupoNumero > 25) {
          return res.status(400).json({ message: "Grupo deve ser entre 1 e 25" });
        }

        aposta = String(grupoNumero).padStart(2, "0");
      }

      if (tipo === "dezena") {
        if (!/^\d{2}$/.test(aposta)) {
          return res.status(400).json({ message: "Dezena deve ter 2 números" });
        }
      }

      if (tipo === "milhar") {
        if (!/^\d{4}$/.test(aposta)) {
          return res.status(400).json({ message: "Milhar deve ter 4 números" });
        }
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      if (user.balance < amount) {
        return res.status(400).json({ message: "Saldo insuficiente" });
      }

      user.balance -= amount;

      const numeroSorteado = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");

      const dezenaSorteada = numeroSorteado.slice(-2);
      const grupoInfo = getGrupoPorDezena(Number(dezenaSorteada));
      const grupoSorteado = grupoInfo
        ? String(grupoInfo.grupo).padStart(2, "0")
        : null;

      let ganhou = false;
      let premio = 0;

      if (tipo === "grupo") {
        ganhou = aposta === grupoSorteado;
        premio = ganhou ? amount * 18 : 0;
      }

      if (tipo === "dezena") {
        ganhou = aposta === dezenaSorteada;
        premio = ganhou ? amount * 60 : 0;
      }

      if (tipo === "milhar") {
        ganhou = aposta === numeroSorteado;
        premio = ganhou ? amount * 4000 : 0;
      }

      if (ganhou) {
        user.balance += premio;
      }

      await user.save();

      await Bet.create({
        user: user._id,
        tipo,
        valor: amount,
        aposta,
        numeroSorteado,
        grupoSorteado,
        ganhou,
        premio,
      });

      return res.json({
        message: ganhou ? "Você ganhou!" : "Você perdeu!",
        tipo,
        aposta,
        numeroSorteado,
        dezenaSorteada,
        grupoSorteado,
        ganhou,
        premio,
        balance: user.balance,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro no jogo" });
    }
  },
};