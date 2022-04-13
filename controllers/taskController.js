const Task = require('../models/task');

const task_index = (req, res) => {
  Task.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { tasks: result, title: 'All tasks' });
    })
    .catch(err => {
      console.log(err);
    });
}

const task_details = (req, res) => {
  const id = req.params.id;
  Task.findById(id)
    .then(result => {
      res.render('details', { task: result, title: 'Task Details' });
    })
    .catch(err => {
      console.log(err);
    });
}

const task_create_get = (req, res) => {
  res.render('create', { title: 'Create a new task' });
}

const task_create_post = (req, res) => {
  const task = new Task(req.body);
  task.save()
    .then(result => {
      res.redirect('/tasks');
    })
    .catch(err => {
      console.log(err);
    });
}

const task_delete = (req, res) => {
  const id = req.params.id;
  Task.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/tasks' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  task_index, 
  task_details, 
  task_create_get, 
  task_create_post, 
  task_delete
}