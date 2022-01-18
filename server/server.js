const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv")

const scheduleRouter = require("./routes/scheduleRoutes");
const availabilityRouter = require("./routes/availabilityRoutes");
const employeeProfileRouter = require("./routes/employeeProfileRoutes")

dotenv.config()
const app = express();
const port = process.env.PORT || 5001;

// app.use(bodyParser.urlencoded({ extended: false, limit:'10mb' }));
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use("/employeeProfile", employeeProfileRouter);
app.use("/availability", availabilityRouter);

app.use("/api/schedule", scheduleRouter);
app.use("/", express.static("../client/build"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

