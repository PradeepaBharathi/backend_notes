import { client } from "../db.js";
import { ObjectId } from "bson";

export function getNotes() {
  return client.db("notes").collection("notes").find().toArray();
}

export function addNotes(data) {
  return client.db("notes").collection("notes").insertOne(data);
}

export function getNotesbyId(id) {
  return client
    .db("notes")
    .collection("notes")
    .findOne({ _id: new ObjectId(id) });
}

export function getNotesbyName(name) {
  return client.db("notes").collection("notes").find({ title: name }).toArray();
}

export function editNotesbyId(id, updateData) {
  return client
    .db("notes")
    .collection("notes")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateData });
}

export function DeleteNotesbyId(id, data) {
  return client
    .db("notes")
    .collection("notes")
    .findOneAndDelete({ _id: new ObjectId(id) }, { $set: data });
}
