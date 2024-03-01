const express = require('express');
const router = express();
const mongoose = require('mongoose');
const validateTask = require('../validator');
// const validateTask = require('..validator/');

const tasksSchema = new mongoose.Schema({
    name: {
        type: String, Number,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    isFinished: {
        type: Boolean,
        required: true
    }
});

const Task = mongoose.model('Task', tasksSchema);

router.get('/', async (req, res) => {
    const tasks = await Task.find().select({name: 1, date: 1, isFinished: 1});
    res.send(tasks);
});

router.get('/:id', async (req, res) =>{
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found...");

    res.send(task);
});

router.post('/', async (req, res)=>{
    const { error } = validateTask(req.body);
    if (error) res.status(400).send(error.details[0].message);

    let task = new Task({
        name: req.body.name,
        date: req.body.date,
        isFinished: req.body.isFinished
    });
    task = await task.save();
    res.send(task);
});

router.put('/:id', async (req, res)=>{
    const { error } = validateTask(req.body);
    if (error) res.status(400).send(error.details[0].message);
    const task = await Task.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        date: req.body.date,
        isFinished: req.body.isFinished},{new: true});
    if (!task) return res.status(404).send("Task not found...");
    res.send(task);

});

router.delete('/:id', async (req, res)=>{
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) return res.status(404).send('Task not found...');

    res.send(task);
}); 

module.exports = router;