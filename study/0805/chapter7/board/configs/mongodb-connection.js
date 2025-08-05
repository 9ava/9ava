require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URL;

module.exports = async function () {
  const client = await MongoClient.connect(uri);
  return client;
};
