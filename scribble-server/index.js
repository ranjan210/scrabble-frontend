const express = require("express");
const http = require("http");
const path = require("path");
const bodyparser = require("body-parser")
const cors = require("cors")
const roomManager = require("./controllers/roomManager");
const scoreManager = require("./controllers/scoreManager");
const app = express();
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const { resolvePtr } = require("dns");

const PORT = process.env.PORT || 3030;
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }

});

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
}
app.use(cors(corsOptions))

global.roomIds = [];
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
  res.send("Backend is Live")
})
app.post("/room", roomManager.newRoom);
app.post("/joinroom", roomManager.joinRoom);
app.post("/getboard", roomManager.sendBoard);

 
server.listen(PORT, () => {
  console.log("Server Started");
})

io.on("connection", (socket) => {

  socket.on("join-room", (username, roomId) => {
    socket.username = username;
    socket.join(roomId)
    socket.to(roomId).emit("addPlayer",username)
  })

  socket.on("sendMessage", (message, roomId) => {
    socket.to(roomId).emit("recieveMessage", socket.username, message)
  })

  socket.on("updateGrid", (roomId, val, pos) => {



    if (global.roomIds.includes(roomId)) {

      global[roomId].grid[pos] = val;
      global[roomId].submitGrid[pos] = true;

      scoreManager.checkScore(val, pos, roomId, (myscore) => {

        const thisUser = socket.username;
        global[roomId].players.forEach((element, index) => {
          if (element.name == thisUser) {
            global[roomId].players[index].score += myscore
          }
        });

        global[roomId].turn += 1;
        if (global[roomId].turn > global[roomId].players.length - 1) {
          global[roomId].turn = 0;
        }

        const currentUser = global[roomId].players[global[roomId].turn].name
        const clientIds = io.sockets.adapter.rooms.get(roomId);
        for (const clientId of clientIds) {
          const clientNickName = io.sockets.sockets.get(clientId).username;
          if (clientNickName == currentUser) {
            const client = io.sockets.sockets.get(clientId);
            client.emit("turn_enable");
          }
        }

        io.to(roomId).emit("updategrid", pos, val,thisUser,myscore,global[roomId].turn);
      })




    }


  })

  socket.on("startGame", () => {

    io.to(socket.roomId).emit("game-start");

  })

})