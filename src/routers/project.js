const express = require("express");
const router = new express.Router();
const Project = require("../models/Project");
const checkIfAuth = require("../middleware/auth");
const ProjectTask = require("../models/Projecttask");

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
//route to get all projects
router.get("/projects", checkIfAuth, async (req, res) => {
  try {
    await req.user.populate("projects").execPopulate();
    // req.user.projects.populate("tasks").execPopulate();
    res.send(req.user.projects);
  } catch (e) {
    console.log(e);
  }
});
//route to get single project
router.get("/projects/:id/tasks", checkIfAuth, async (req, res) => {
  try {
    // const projects = await ProjectTask.find({ in: req.params.id });
    const project = await Project.findById(req.params.id);
    console.log(project);
    await project.populate("taskss").execPopulate();
    console.log(project.tasks);
    return res.send(projects.tasks);
  } catch (e) {
    res.status(404).send();
  }
});
//route to make changes to single project
router.patch("/projects/:id", checkIfAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    console.log(project);

    const updates = Object.keys(req.body);
    if (updates.includes("task")) {
      const newTask = new ProjectTask({
        title: req.body.task,
        in: req.params.id
      });

      project.tasks.push({
        _id: newTask._id
      });
      console.log(newTask);
      await project.save();
      await newTask.save();
      res.status(201).send();
    }
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});
module.exports = router;
