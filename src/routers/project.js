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
  const projects = await Project.find({ Owner: req.user._id });
  // const filteredProjects = projects.filter(project => {
  //   return project.users.includes(req.user._id);
  // });
  res.send(projects);
});
router.get("/projects/:id", checkIfAuth, async (req, res) => {
  const project = await Project.findById(req.body._id);
  res.send(project);
});
module.exports = router;
