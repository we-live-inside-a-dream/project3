const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();
const port = process.env.PORT || 5001;
// const io = require('socket.io')(5002, {
//   cors:{origin:["http://localhost:3001"],
// },
// })

// io.on('connection', socket => {
//   const id = socket.handshake.query.id
//   // displayMessage(`you connected with id:${id}`)
//   console.log(`user ${id} connected`)
//   socket.join(id)

//   socket.on('send-message', ({ recipients, text }) => { //recipients is the person receiving the text
//     recipients.forEach(recipient => {
//       const newRecipients = recipients.filter(r => r !== recipient)
//       newRecipients.push(id)
//       socket.broadcast.to(recipient).emit('receive-message', {
//         recipients: newRecipients, sender: id, text
//       })
//     })
//   })
//   // socket.on("",()=>{})

// })

const scheduleRouter = require("./routes/scheduleRoutes");
const availabilityRouter = require("./routes/availabilityRoutes");
const employeeProfileRouter = require("./routes/employeeProfileRoutes");
const authRouter = require("./routes/authRoutes");
const timeOffRouter = require("./routes/timeOffRoutes");
const eventsRouter = require("./routes/eventsRoutes");
const chatRouter = require("./routes/chatRoutes")
const conversationsRouter = require("./routes/conversationsRoutes")
const messagesRouter = require("./routes/messagesRoutes")

const app = express();
app.use(bodyParser.json());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use("/api/conversations",conversationsRouter);
app.use("/api/messages",messagesRouter);
app.use("/api/chat",chatRouter);
app.use("/api/employeeProfile", employeeProfileRouter);
app.use("/api/availability", availabilityRouter);
app.use("/api/timeOff", timeOffRouter);
app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/", express.static("../client/build"));

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build", "index.html"));
// });

app.listen(port, () => {
  // console.log(`socket open at http://localhost:${io}`)
  console.log(`Example app listening at http://localhost:${port}`);
});
