const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;