const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MONGODB CONNECTED: ${conn.connection.host} 🏦`);
  } catch (error) {
    console.error("❌ ERRO AO CONECTAR NO MONGO:");
    console.error(error.message);

    // aqui sim faz sentido derrubar o app
    process.exit(1);
  }
};

module.exports = connectDB;