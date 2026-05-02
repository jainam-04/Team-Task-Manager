const router = require('express').Router();
const Project = require('../models/Project.js');
const auth = require('../middlewares/AuthMiddleware.js');

router.post("/", auth, async (req, res) => {
      try {
            if (req.user.role !== "admin") {
                  return res.status(403).json({ message: "Access denied" });
            }
            const { name, members } = req.body;
            const project = await Project.create({
                  name,
                  members,
                  createdBy: req.user.id
            });
            res.status(200).json(project);
      }
      catch (error) {
            res.status(500).json({ message: error.message });
      }
});

router.get("/", auth, async (req, res) => {
      try {
            const projects = await Project.find({
                  members: req.user.id
            }).populate("members", "name exmail");
            res.status(200).json(projects);
      }
      catch (error) {
            res.status(500).json({ message: error.message });
      }
});

module.exports = router;