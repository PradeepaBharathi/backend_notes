import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import { user_router } from "./routes/user_routes.js";
import { notes_router } from "./routes/notes_router.js";
import {isAuthenticated} from "./Authentication.js/userAuth.js"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT

app.use("/", user_router);
app.use("/",isAuthenticated,notes_router);
app.get("/", async (req, res) => {
  return res.status(201).send({ message: "Notes Backend Working Properly" });
});
app.listen(PORT,  () => {
    console.log(`Listening to Port ${PORT}`)
})

