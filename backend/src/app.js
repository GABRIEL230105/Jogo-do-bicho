const express = require("express");
const routes = require("./routes/index.routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ PREFIXO PADRÃO DE API
app.use("/api/users", routes);

// ✅ ROTA DE TESTE
app.get("/", (req, res) => {
  res.status(200).json({ message: "API rodando 🚀" });
});

module.exports = app;