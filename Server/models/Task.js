const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: { type: String, required: true },
    taskSection: { type: String, required: true },
    status: { type: Boolean, required: true,default:false },
  },
  { timestamps: true }
);
const TaskModel = mongoose.model("Task", TaskSchema);
module.exports = TaskModel;
