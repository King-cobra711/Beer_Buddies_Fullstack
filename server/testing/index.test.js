const supertest = require("supertest");
const app = require("../index");
const request = supertest(app);

beforeAll(async (done) => {
  const reponse = await (await request.post("/login")).setEncoding({
    Username: "testuser",
    Password: "aaaaaa",
  });
});

const session;

describe("Successful registration check with email, username and password", () => {
  test("Should respond with a 200 status code", async () => {
    const res = await request.post("/checkRegisterDetails").send({
      Email: "jesttest@email.com.au",
      Username: "Jestyboy",
      Password: "Password",
    });
    expect(res.statusCode).toBe(200);
  });
});

describe("Successful Login with email, username and password", () => {
  test("Should respond with a 200 status code", async () => {
    const res = await request.post("/register").send({
      Email: "jesttest@email.com.au",
      Username: "Jestyboy",
      Password: "Password",
    });
    expect(res.statusCode).toBe(200);
  });
});
describe("Successful Login username and password", () => {
  test("Should respond with a 200 status code", async () => {
    const res = await request.post("/login").send({
      Username: "testuser",
      Password: "aaaaaa",
    });
    expect(res.statusCode).toBe(200);
  });
});
describe("Successful retrieval of user's scores", () => {
  test("Should respond with a 200 status code", async () => {
    const res = await request.post("/userScores").send({
      id: 43,
    });
    expect(res.statusCode).toBe(200);
  });
});
