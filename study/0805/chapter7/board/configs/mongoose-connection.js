const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const uri =
  "mongodb+srv://zudrion:<db_password>@cluster0.phbjgmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/board?retryWrites=true&w=majority";

module.exports = function () {
  return mongoose.connect(uri, { useNewUrlParser: true });
};
