const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
const uri = process.env.MONGO_URL;

module.exports = function () {
  return mongoose.connect(uri, { useNewUrlParser: true });
};
