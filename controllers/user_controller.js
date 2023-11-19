const { dbConnection } = require("../db.js");
const { ObjectId } = require("bson");
const jwt = require("jsonwebtoken");

async function addUser(data) {
  const client = await dbConnection();
  return client.db("notes").collection("users").insertOne(data);
}

async function getUser(data) {
  const client = await dbConnection();
  return client.db("notes").collection("users").findOne(data);
}

async function getUserByID(id) {
  const client = await dbConnection();
  return client
    .db("notes")
    .collection("users")
    .findOne({ _id: new ObjectId(id) });
}

async function generateToken(id, secret) {
 console.log(id)
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "30d" });
}
module.exports = {
  addUser,
  getUser,
  getUserByID,
  generateToken,
};
