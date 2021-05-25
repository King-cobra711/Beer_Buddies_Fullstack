const supertest = require("supertest");
const app = require("../index");
const request = supertest(app);

// let cookie;

// beforeAll(async (done) => {
//   const reponse = await request.post("/login").send({
//     Username: "testuser",
//     Password: "aaaaaa",
//   });
//   const cookies = res.headers["set-cookie"][0]
//     .split(",")
//     .map((item) => item.split(";")[0]);
//   cookie = cookies.join(";");
//   done();
// });

describe("Successful registration check with email, username and password", () => {
  test("Should respond with a 200 status code", async (done) => {
    const res = await request.post("/checkRegisterDetails").send({
      Email: "jesttest@email.com.au",
      Username: "Jestyboy",
      Password: "Password",
    });
    expect(res.statusCode).toBe(200);
    done();
  });
});

describe("Successful Login with email, username and password", () => {
  test("Should respond with a 200 status code", async (done) => {
    const res = await request.post("/register").send({
      Email: "jesttest@email.com.au",
      Username: "Jestyboy",
      Password: "Password",
    });
    expect(res.statusCode).toBe(200);
    done();
  });
});

describe("Successful Login username and password", () => {
  test("Should respond with a 200 status code", async (done) => {
    const res = await request.post("/login").send({
      Username: "testuser",
      Password: "aaaaaa",
    });
    expect(res.statusCode).toBe(200);
    done();
  });
});
describe("Successful retrieval of user's scores", () => {
  test("Should respond with a 200 status code", async () => {
    const res = await request.post("/userScores").send({
      User_Name: "testuser",
      UserType_ID: 2,
      id: 43,
    });
    expect(res.statusCode).toBe(200);
  });
});
