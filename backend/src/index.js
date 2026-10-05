require("dotenv").config();

const database = require("./config/database");
const app = require("./app");

// 🔥 IMPORTA SWAGGER
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// 🔥 USA SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if (process.env.NODE_ENV !== "test") {
  database();

  app.listen(process.env.PORT || 3333, () => {
    console.log(`server is running on http://localhost:${process.env.PORT || 3333}`);
  });
}