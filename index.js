const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { user_router } = require("./routes/user_routes.js");
const { notes_router } = require("./routes/notes_router.js");
const { isAuthenticated } = require("./Authentication.js/userAuth.js");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

app.use("/", user_router);
app.use("/", isAuthenticated, notes_router);
app.get("/", async (req, res) => {
  return res.status(201).send({ message: "Notes Backend Working Properly" });
});
app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
