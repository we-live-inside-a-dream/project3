const dotenv = require("dotenv")
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const session = require("express-session")
const passport = require("passport")

dotenv.config()
const port = process.env.PORT || 5001
const app = require("express")()
const http = require("http").Server(app)

const io = require("socket.io")(http)

let users = []

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId })
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId)
}

io.on("connection", (socket) => {
  //when connect
  // console.log(socket)
  //take userId and socketId from user
  //new socketId is created everytime page is refreshed
  socket.on("addUser", (userId) => {
    console.log("a user connected.", userId)
    addUser(userId, socket.id)

    io.emit("getUsers", users)
  })

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId)
    console.log(user)
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    })
  })

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!")
    removeUser(socket.id)
    io.emit("getUsers", users)
  })
})

const scheduleRouter = require("./routes/scheduleRoutes")
const availabilityRouter = require("./routes/availabilityRoutes")
const employeeProfileRouter = require("./routes/employeeProfileRoutes")
const authRouter = require("./routes/authRoutes")
const timeOffRouter = require("./routes/timeOffRoutes")
const eventsRouter = require("./routes/eventsRoutes")
const chatRouter = require("./routes/chatRoutes")
const conversationsRouter = require("./routes/conversationsRoutes")
const messagesRouter = require("./routes/messagesRoutes")

app.use(session({ secret: "cats" }))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

// app.use(express.json());
// app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use("/api/conversations", conversationsRouter)
app.use("/api/messages", messagesRouter)
app.use("/api/chat", chatRouter)
app.use("/api/employeeProfile", employeeProfileRouter)
app.use("/api/availability", availabilityRouter)
app.use("/api/timeOff", timeOffRouter)
app.use("/api/auth", authRouter)
app.use("/api/events", eventsRouter)
app.use("/api/schedule", scheduleRouter)
app.use("/", express.static("../client/build"))

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build", "index.html"));
// });

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
