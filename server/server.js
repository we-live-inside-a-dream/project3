const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();
const port = process.env.PORT || 5001;

const scheduleRouter = require("./routes/scheduleRoutes");
const availabilityRouter = require("./routes/availabilityRoutes");
const employeeProfileRouter = require("./routes/employeeProfileRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(session({ secret: "cats" }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.use("/api/employeeProfile", employeeProfileRouter);
app.use("/api/availability", availabilityRouter);
app.use("/authRoutes", authRouter);

app.use("/api/schedule", scheduleRouter);
app.use("/", express.static("../client/build"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
