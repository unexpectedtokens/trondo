const express = require("express");
const router = new express.Router();
const dtask = require("../models/Dtask");
const checkIfAuth = require("../middleware/auth");

//route to add new task
router.post("/dtasks", checkIfAuth, async (req, res) => {
  try {
    const newDtask = new dtask({
      title: req.body.title,
      Owner: req.user._id,
      completed: false
    });
    await newDtask.save();
    await req.user.populate("dailyTask").execPopulate();
    res.send(req.user.dailyTask);
    if (!req.user.dailyTask) throw new Error();
  } catch (e) {
    res.status(400).send();
    console.log(e);
  }
});
//route to get all dtasks
router.get("/dtasks", checkIfAuth, async (req, res) => {
  try {
    await req.user.populate("dailyTask").execPopulate();
    if (!req.user.dailyTask) throw new Error();
    res.send(req.user.dailyTask);
  } catch (e) {
    res.status(404).send();
  }
});
router.patch("/dtasks/:id", checkIfAuth, async (req, res) => {
  try {
    const task = await dtask.findOne({ _id: req.params.id });
    task.completed = !task.completed;
    await task.save();
    await req.user.populate("dailyTask").execPopulate();
    res.send(req.user.dailyTask);
  } catch (e) {
    console.log(e);
  }
});
router.delete("/dtasks/:id", checkIfAuth, async (req, res) => {
  try {
    await dtask.findOneAndDelete({ _id: req.params.id });
    await req.user.populate("dailyTask").execPopulate();
    if (!req.user.dailyTask) throw new Error();
    res.send(req.user.dailyTask);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
