const express = require("express");
const {
  DeleteNotesbyId,
  addNotes,
  editNotesbyId,
  getNotes,
  getNotesbyId,
  getNotesbyName,
} = require("../controllers/notes_controller.js");

const router = express.Router();

router.post("/create-notes", async (req, res) => {
  const firstNote = req.body;
  firstNote.createdAt = new Date();
  console.log(firstNote);
  try {
    if (!firstNote) {
      return res.status(400).json({ message: "no data available" });
    }

    const { title, description, date } = firstNote;
    if (!title || !description || !date) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const result = await addNotes({ ...firstNote });
    console.log(result);
    if (!result.acknowledged) {
      return res.status(400).json({ message: "error occured" });
    }

    res.status(200).json({ data: { ...firstNote }, status: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error occured" });
  }
});
router.get("/all-notes", async (req, res) => {
  try {
    const allNotes = await getNotes(req);
    // console.log(studentData)
    if (!allNotes) {
      return res.status(400).json({ message: "no data availabe" });
    }
    res.status(200).json({ data: allNotes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await getNotesbyId(id);
    // console.log(studentData)
    if (!notes) {
      return res.status(400).json({ message: "no data availabe" });
    }
    res.status(200).json({ data: notes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/notes-name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const notes = await getNotesbyName(name);
    console.log(notes);
    if (!notes) {
      return res.status(400).json({ message: "no data availabe" });
    }
    res.status(200).json({ data: notes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

router.put("/edit-notes/:id", async (req, res) => {
  const { id } = req.params;
  const updateNote = req.body;

  try {
    if (!updateNote || !id) {
      return res.status(400).json({ message: "no data available" });
    }

    const findNote = await getNotesbyId(id);
    let newNote = { ...findNote, ...updateNote };

    const result = await editNotesbyId(id, newNote);
    console.log(result);
    if (!result) {
      return res.status(400).json({ message: "Error occured" });
    }
    res.status(200).json({ updateNote: newNote, status: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error occured" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = req.body;
    if (!id || !deleteNote) {
      return res.status(400).json({ message: "Wrong request" });
    }

    const note = await getNotesbyId(id);
    if (!note) {
      return res.status(404).json({ message: "note not found" });
    }

    const result = await DeleteNotesbyId(id, deleteNote);
    console.log(result);
    if (!result.deletedCount <= 0) {
      return res.status(400).json({ message: "error occured" });
    }
    return res
      .status(201)
      .json({ data: note, status: result, message: "note deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = {
  notes_router:router
};
