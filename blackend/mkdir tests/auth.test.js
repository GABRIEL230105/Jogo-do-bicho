const bcrypt = require("bcryptjs");

test("deve validar senha correta", async () => {
  const senha = "123456";

  // criptografa senha
  const hash = await bcrypt.hash(senha, 8);

  // compara senha com hash
  const resultado = await bcrypt.compare(senha, hash);

  expect(resultado).toBe(true);
});