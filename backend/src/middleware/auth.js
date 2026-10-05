const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];

      console.log("AUTH HEADER:", req.headers.authorization);
      console.log("TOKEN:", token);

      if (!token) {
        return res.status(401).json("Token não encontrado");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DECODED:", decoded);

      if (!decoded || !decoded.id) {
        return res.status(401).json("Token inválido");
      }

      const user = await User.findById(decoded.id).select("-password");
      console.log("USER:", user);

      if (!user) {
        return res.status(401).json("Usuário não encontrado");
      }

      req.user = user;
      return next();
    }

    return res.status(401).json("Não autorizado, sem token");
  } catch (error) {
    console.log("ERROR JWT:", error.message);
    return res.status(401).json("Token inválido");
  }
};

module.exports = protect;