const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

dotenv.config();
const port = process.env.PORT || 5001;
const app = require("express")();
const http = require("http").Server(app);

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  // console.log(`user connected`, socket.id);
  const id = socket.handshake.query.id;
  // console.log("userId", id);
  socket.join(id); //the user joins this "room"
  console.log("user Connected", id);

  //send and get message
  socket.on("sendMessage", ({ recipients, sender, text }) => {
    //recipient currently holds sender ID aswell
    // console.log("starts with", recipients);
    // console.log(id);
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter(
        (r) => r !== recipient && r !== sender
      ); // removes current recipient from list
      // console.log("old REc", newRecipients);
      // newRecipients.push(id);
      // console.log("new REC", newRecipients);
      // console.log("broadcast to room", recipient);
      // socket.broadcast.to(recipient).emit("getunread", {});
      // socket.broadcast.to(recipient).emit("getNotification", {});
      socket.broadcast.to(recipient).emit("getMessage", {
        recipients,
        sender,
        text,
      });
    });
  });

  socket.on("update", () => {
    socket.emit("getNotification", {});
    socket.emit("getUnread");
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    // removeUser(socket.id);
    // io.emit("getUsers", users);
  });
});

const scheduleRouter = require("./routes/scheduleRoutes");
const availabilityRouter = require("./routes/availabilityRoutes");
const employeeProfileRouter = require("./routes/employeeProfileRoutes");
const authRouter = require("./routes/authRoutes");
const timeOffRouter = require("./routes/timeOffRoutes");
const eventsRouter = require("./routes/eventsRoutes");
const chatRouter = require("./routes/chatRoutes");
const conversationsRouter = require("./routes/conversationsRoutes");
const messagesRouter = require("./routes/messagesRoutes");

app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use("/api/conversations", conversationsRouter);
app.use("/api/messages", messagesRouter);
// app.use("/api/chat", chatRouter);
app.use("/api/employeeProfile", employeeProfileRouter);
app.use("/api/availability", availabilityRouter);
app.use("/api/timeOff", timeOffRouter);
app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/", express.static("../client/build"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
