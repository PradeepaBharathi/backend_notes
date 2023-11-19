const { dbConnection } = require("../db.js");
const { ObjectId } = require("bson");
async function getNotes() {
  const client = await dbConnection();
  return client.db("notes").collection("notes").find().toArray();
}

async function addNotes(data) {
  const client = await dbConnection();
  return client.db("notes").collection("notes").insertOne(data);
}

async function getNotesbyId(id) {
  const client = await dbConnection();
  return client
    .db("notes")
    .collection("notes")
    .findOne({ _id: new ObjectId(id) });
}

async function getNotesbyName(name) {
  const client = await dbConnection();
  return client.db("notes").collection("notes").find({ title: name }).toArray();
}

async function editNotesbyId(id, updateData) {
  const client = await dbConnection();
  return client
    .db("notes")
    .collection("notes")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateData });
}

async function DeleteNotesbyId(id, data) {
  const client = await dbConnection();
  return client
    .db("notes")
    .collection("notes")
    .findOneAndDelete({ _id: new ObjectId(id) }, { $set: data });
}
module.exports = {
  getNotes,
  addNotes,
  getNotesbyId,
  getNotesbyName,
  editNotesbyId,
  DeleteNotesbyId,
};
