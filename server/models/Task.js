const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
      title: {
            type: String,
            required: true
      },
      projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
      },
      assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
      },
      status: {
            type: String,
            enum: ["todo", "in-progress", "done"],
            default: "todo"
      },
      deadline: {
            type: Date,
            required: true
      }
}, {
      timestamps: true
});

module.exports = mongoose.model("task", TaskSchema);