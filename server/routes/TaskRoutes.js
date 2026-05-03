const router = require('express').Router();
const Project = require('../models/Project.js');
const Task = require('../models/Task.js');
const auth = require('../middlewares/AuthMiddleware.js');

router.post("/", auth, async (req, res) => {
      try {
            if (req.user.role !== "admin") {
                  return res.status(403).json({ message: "Access denied" });
            }
            const { title, projectId, assignedTo, deadline } = req.body;
            const project = await Project.findById(projectId);
            if (!project.members.includes(assignedTo)) {
                  return res.status(400).json({ message: "User not in project" });
            }
            const task = await Task.create({
                  title,
                  projectId,
                  assignedTo,
                  deadline
            });
            res.status(200).json(task);
      }
      catch (error) {
            res.status(500).json({ message: error.message });
      }
});

router.get("/my", auth, async (req, res) => {
      try {
            const tasks = await Task.find({
                  assignedTo: req.user.id
            }).populate("projectId", "name")
                  .populate("assignedTo", "name email");
            res.status(200).json(tasks);
      }
      catch (error) {
            res.status(500).json({ message: error.message });
      }
});

router.put("/:id", auth, async (req, res) => {
      try {
            const task = await Task.findById(req.params.id);
            if (!task) {
                  return res.status(404).json({ message: "Task not found" });
            }
            if (task.assignedTo.toString() !== req.user.id && req.user.role !== "admin") {
                  return res.status(403).json({ message: "Not allowed" });
            }
            task.status = req.body.status;
            await task.save();
            res.status(200).json(task);
      }
      catch (error) {
            res.status(500).json({ message: error.message });
      }
});

router.get("/dashboard", auth, async (req, res) => {
      try {
            const tasks = await Task.find({ assignedTo: req.user.id });
            const now = new Date();
            const stats = {
                  total: tasks.length,
                  todo: 0,
                  inProgress: 0,
                  done: 0,
                  overdue: 0
            };
            tasks.forEach(task => {
                  if (task.status === "todo") {
                        stats.todo++;
                  }
                  if (task.status === "in-progress") {
                        stats.inProgress++;
                  }
                  if (task.status === "done") {
                        stats.done++;
                  }
                  if (task.deadline < now && task.status !== "done") {
                        stats.overdue++;
                  }
            });
            res.status(200).json(stats);
      }
      catch (error) {
            res.status(500).json({ message: error.message });
      }
});

router.get("/project/:projectId", auth, async (req, res) => {
      try {
            const tasks = await Task.find({
                  projectId: req.params.projectId
            }).populate("assignedTo", "name email");
            res.status(200).json(tasks);
      }
      catch (error) {
            res.status(500).json({ message: error.message });
      }
});

module.exports = router;