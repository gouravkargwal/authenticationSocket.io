const {
  registerUser,
  loginUser,
  uploadPhoto,
  allPhotos,
} = require("./SocketFunctions");

module.exports = socketHandler = (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("register", (data) => {
    const { username, password, email } = data;
    const { error, user } = registerUser({ username, email, password });
    if (error) {
      return socket.emit("registerError", "User already exists");
    }
    return socket.emit("registerSuccess", "Account created successfully!");
  });

  socket.on("login", (data) => {
    const { username, password } = data;
    const { error, user } = loginUser({ username, password });
    if (error) {
      return socket.emit("loginError", "Incorrect credentials");
    } else {
      console.log(user);
      return socket.emit("loginSuccess", {
        message: "Login Successful!",
        user,
      });
    }
  });

  socket.on("uploadPhoto", (data) => {
    const { email, photoURL } = data;
    const { image, error } = uploadPhoto({ email, photoURL });
    console.log(image, error);
    if (error) {
      return socket.emit("uploadPhotoError", "Upload Failed!");
    } else {
      return socket.emit("uploadPhotoSuccess", "Upload Successful!");
    }
  });

  socket.on("allPhotos", (data) => {
    const { images } = allPhotos();
    console.log(images);
    return socket.emit("allPhotosMessage", {
      message: "Photos retrieved successfully",
      photos: images,
    });
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
};
