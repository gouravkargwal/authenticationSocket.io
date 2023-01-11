const request = require("supertest");
const {
  registerUser,
  loginUser,
  uploadPhoto,
} = require("./src/SocketFunctions");

describe("Backend Test", () => {
  const user = {
    username: "test1",
    email: "test1@hotmail.com",
    password: "123456",
    images: [],
  };

  const userFail = {
    username: "test1",
    email: "test1@hotmail.com",
    password: "1234567",
    images: [],
  };

  const loggedUser = {
    _email: "test1@hotmail.com",
  };

  const imageData = {
    email: "test1@hotmail.com",
    photoURL:
      "https://repository-images.githubusercontent.com/400223497/5f87c14d-6342-47cb-8620-5c5466e8cf4c",
  };

  const imageDataFail = {
    email: "testfail@hotmail.com",
    photoURL:
      "https://repository-images.githubusercontent.com/400223497/5f87c14d-6342-47cb-8620-5c5466e8cf4c",
  };

  test("Register User Success", async () => {
    const response = registerUser(user);
    expect(response).toMatchObject({ user });
  });

  test("Register User Failed", async () => {
    registerUser(user);
    const response = registerUser(user);
    expect(response).toMatchObject({ error: "User already exists!" });
  });

  test("Login User", async () => {
    registerUser(user);
    const response = loginUser(user);
    expect(response).toMatchObject({ user: loggedUser });
  });

  test("Login User Failed", async () => {
    registerUser(user);
    const response = loginUser(userFail);
    expect(response).toMatchObject({ error: "Incorrect credentials" });
  });

  test("Upload Photo Success", async () => {
    registerUser(user);
    loginUser(user);
    const response = uploadPhoto(imageData);
    expect(response).toMatchObject({
      image: {
        image_url:
          "https://repository-images.githubusercontent.com/400223497/5f87c14d-6342-47cb-8620-5c5466e8cf4c",
        _ref: "test1@hotmail.com",
      },
    });
  });

  test("Upload Photo Failed", async () => {
    registerUser(user);
    loginUser(user);
    const response = uploadPhoto(imageDataFail);
    expect(response).toMatchObject({ error: "User not found!" });
  });
});
