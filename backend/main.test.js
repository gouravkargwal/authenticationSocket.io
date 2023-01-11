const request = require("supertest");
const createServer = require("./src/server");
const multer = require("multer");
const Image = require("./src/imageModel");
const connectDb = require("./src/db");
const mongoose = require("mongoose");
const fs = require("fs");

let app;
beforeAll(async () => {
  app = createServer();
  process.env.NoDE_ENV = "test";
  await connectDb();
});

describe("POST /upload", () => {
  let id;
  test("Upload a image", async () => {
    const response = await request(app)
      .post("/uploadimage")
      .set("content-type", "multipart/form-data")
      .field("imgName", "myemail@gmail.com")
      .field("imgDesc", "slim")
      .attach(
        "imgFile",
        fs.readFileSync(
          `${__dirname}/data/0a17cb85-6444-4b16-bd58-2760d6463f59-1661861916813.png`
        ),
        "tests/file.png"
      );
    expect(response.statusCode).toEqual(200);
  });

  test("All Image Route", async () => {
    const res = await request(app).get("/allimage");
    expect(res.statusCode).toEqual(200);
    id = res.body[0]._id;
  });

  test("Single Image Route", async () => {
    const response = await request(app).get(`/image/${id}`).send();
    expect(response.statusCode).toEqual(200);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
