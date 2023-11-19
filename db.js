const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.MONGO_URL;

 async function dbConnection() {
  const client = new MongoClient(connectionString);
  await client.connect();
  console.log("DB COnnected");
  return client;
}

 const client =  dbConnection();
module.exports = {
  dbConnection,
  client
};