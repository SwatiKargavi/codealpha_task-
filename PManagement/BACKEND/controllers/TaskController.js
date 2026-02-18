const Task = require('../models/Task');

// Get tasks for a specific project
const getTasksByProject = async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId });
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Update task status
const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// DELETE TASK - This was the missing or misnamed function
const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// CRITICAL: All four must be exported here
module.exports = {
    getTasksByProject,
    createTask,
    updateTaskStatus,
    deleteTask
};