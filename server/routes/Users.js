// routes/userRouter.js

const express = require("express");
const router = express.Router();
const { User } = require("../models");
const {
  logIn,
  register,
  sendEmail,
  resetPassword,
  forgotPassword,
  changePassword,
} = require("../controllers/Users.controller");

router.get("/", async (req, res) => {
  try {
    const listOfUsers = await User.findAll();
    res.json(listOfUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = req.body;
    await User.create(post);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update(updatedUser);

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.json({ message: "User removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to remove user" });
  }
});

// Additional routes from the second file
router.post("/login", logIn);
router.post("/register", register);
router.post("/sendEmail", sendEmail);
router.post("/reset/:id/:token", resetPassword);
router.post("/forgotPass/:email", forgotPassword);
router.post("/changePassword/:id", changePassword);

module.exports = router;
