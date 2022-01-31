const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = Schema({
  token: {
    type: String,
    required: true,
  },
  _employeeId: {
    type: Schema.Types.ObjectId,
    ref: "employeeProfile",
  },
  tokenType: {
    type: String,
    enum: ["login", "resetPassword"],
  },
});

const Token = mongoose.model("tokens", tokenSchema);
module.exports = { Token };
