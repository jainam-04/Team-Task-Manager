const router = require('express').Router();
const User = require('../models/User.js');

router.get("/", async (req, res) => {
      try {
            const users = await User.find().select("_id name email");
            res.status(200).json(users);
      }
      catch (error) {
            res.status(500).json({ message: error.message });
      }
});

module.exports = router;