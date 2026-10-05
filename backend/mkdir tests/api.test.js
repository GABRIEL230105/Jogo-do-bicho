const request = require("supertest");
const app = require("../src/app");

test("GET / deve retornar 200", async () => {
  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);
});