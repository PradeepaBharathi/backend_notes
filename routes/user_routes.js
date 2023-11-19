import express from "express";
import bcrypt from "bcryptjs";
import { addUser, generateToken, getUser, getUserByID } from "../controllers/user_controller.js";


const router = express.Router();

router.get("/getUser", async (req, res) => {
  try {
    console.log("get a user");

    const user = await getUser(req.body);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getUserId/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("get a user id");
    const user = await getUserByID(id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    //hashing user password.
    console.log("adding user");
    const salt = await bcrypt.genSalt(10);
    const user = await getUser({ email: req.body.email });
    //validating if user already exist
    if (!user) {
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
         const hasedConfirmPassword = await bcrypt.hash(req.body.confirmPassword, salt);
      const hashedUser = await { ...req.body, password: hashedPassword,confirmPassword:hasedConfirmPassword };
      const result = await addUser(hashedUser);
      // checking mongodb acknowledgement
      if (!result.acknowledged) {
        return res
          .status(404)
          .json({ message: "Error uploading user information" });
      }
      return res.status(201).json({ data: hashedUser,success:true,message:"registration successfull" });
    }
    res.status(400).json({ message: "Email already exist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//login to check credentials
router.post("/login", async (req, res) => {
  try {
    //user exist validations
    const user = await getUser({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Email" ,status:404});
    }
    // validating password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = generateToken(user._id);
    res.status(200).json({ data: user,success:true,message:"login successful",token:token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export const user_router = router;
