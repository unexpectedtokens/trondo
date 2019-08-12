const express = require("express");
const router = new express.Router();
const Project = require("../models/Project");
const checkIfAuth = require("../middleware/auth");

//route to add new task
router.post("/projects", checkIfAuth, async (req, res) => {
  const project = new Project({
    title: req.body.title,
    Owner: req.user._id,
    users: [{ _id: req.user._id }]
  });
  try {
    await project.save();
    res.status(200).send(project);
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});
router.get("/projects", checkIfAuth, async (req, res) => {
  //temporary fix
  //
  try {
    await req.user.populate("projects").execPopulate();
    res.send(req.user.projects);
  } catch (e) {
    console.log(e);
  }
});
router.get("/projects/:id", checkIfAuth, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project && project.Owner === req.user._id) {
    return res.send(project);
  }
  res.status(404).send();
});
router.patch("/projects/:id", checkIfAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params._id);
    const updates = Object.keys(req.body);
    if (updates.includes(task)) {
      const newTask = new ProjectTask({
        ...req.body
      });
      project.tasks.concat({
        _id: newTask._id
      });
      await project.save();
      await newTask.save();
      res.status(203).send();
    }
  } catch (e) {
    res.status(404).send();
  }
});
module.exports = router;
