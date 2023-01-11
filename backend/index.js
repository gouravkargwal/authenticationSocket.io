const createServer = require("./src/server");
const app = createServer();
const socketHandler = require("./src/SocketEvents");
const port = process.env.port || 8000;

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const socketIO = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

socketIO.on("connection", socketHandler);
