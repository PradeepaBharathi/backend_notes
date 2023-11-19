import { client } from "../db.js";
import { ObjectId } from "bson";
import jwt from "jsonwebtoken"

export function addUser(data) {
  return client.db("notes").collection("users").insertOne(data);
}

export function getUser(data) {
  return client.db("notes").collection("users").findOne(data);
}

export function getUserByID(id) {
  return client
    .db("notes")
    .collection("users")
    .findOne({ _id: new ObjectId(id) });
}

export function generateToken(id, secret) {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "30d" });
}
