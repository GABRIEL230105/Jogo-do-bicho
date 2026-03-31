const request = require("supertest");
const app = require("../src/app");

describe("User", () => {
  test("não deve atualizar sem token", async () => {
    const response = await request(app)
      .put("/api/users/123") // id fake
      .send({
        name: "Teste",
      });

    expect(response.statusCode).toBe(401);
  });
});