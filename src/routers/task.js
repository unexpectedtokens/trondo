const express = require("express");
const router = new express.Router();
const Task = require("../models/Task");
const checkIfAuth = require("../middleware/auth");

//route to add new task
router.post("/tasks", checkIfAuth, async (req, res) => {
  const task = new Task({
    ...req.body,
    Owner: req.user._id
  });
  try {
    await task.save();
    res.status(200).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});
router.get("/tasks", checkIfAuth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort: {
            completed: -1
          }
        }
      })
      .execPopulate();
    res.status(200).send(req.user.tasks);
  } catch (e) {
    res.status(404).send(e);
  }
});
router.get("/tasks/:id", checkIfAuth, async (req, res) => {
  try {
    const tasks = await Task.findOne({ _id, Owner: req.user._id });
    res.status(200).send(tasks);
  } catch (e) {
    res.status(404).send(e);
  }
});
router.patch("/tasks/:id", checkIfAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ errors: "Invalid update method" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      Owner: req.user._id
    });
    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();
    if (!task) return res.status(404).send();

    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});
router.delete("/tasks/:id", checkIfAuth, async (req, res) => {
  try {
    const user = await Task.findOneAndDelete({
      _id: req.params.id,
      Owner: req.user._id
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/testtasks", checkIfAuth, (req, res) => {
  const testArr = [
    { name: "test", description: "test task", completed: false },
    { name: "test15", description: "test task", completed: false },
    { name: "test", description: "test task", completed: false },
    { name: "test", description: "test task", completed: false }
  ];
  res.send(testArr);
});
module.exports = router;
