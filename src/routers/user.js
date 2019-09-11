const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const checkIfAuthenticated = require("../middleware/auth");
const uploadAvatar = require("../middleware/avatar");
router.get("/users", checkIfAuthenticated, async (req, res) => {
  const users = await User.find();
  res.send(users);
});
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  user.email = req.body.email.toLowerCase();
  console.log(user.email);
  try {
    await user.save();
    const token = await user.genAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
//logging in router
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email.toLowerCase(),
      req.body.password
    );
    const token = await user.genAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(404).send(e);
  }
});

//Logging out from all devices router
router.post("/users/logoutall", checkIfAuthenticated, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

//Logging out router
router.post("/users/logout", checkIfAuthenticated, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", checkIfAuthenticated, async (req, res) => {
  res.send(req.user);
});

//Avatar routes
router.post(
  "/users/me/avatar",
  checkIfAuthenticated,
  uploadAvatar.single("avatar"),
  async (req, res) => {
    // req.user.avatar = req.file.buffer;
    const mdImg = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250
      })
      .png()
      .toBuffer();
    req.user.avatar = mdImg;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => res.status(400).send({ error: error.message })
);
router.delete("/users/me/avatar", checkIfAuthenticated, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("No users found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/me", checkIfAuthenticated, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age", "background"];
  isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ errors: "Invalid updates" });
  }
  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.delete("/users/me", checkIfAuthenticated, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
