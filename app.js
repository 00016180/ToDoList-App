const express = require('express');
const app = express();
const mongoose = require('mongoose');
const tasks = require('./routes');

app.use(express.json());
app.use('/api/tasks', tasks);

app.get('/', (req, res) =>{
    res.send("HELLO WORLD!");
});
mongoose.connect('mongodb://localhost/ToDoList')
    .then(()=>console.log('Connected to MongoDb...'))
    .catch(err => console.log('Could not connect to MongoDb...', err));  

app.listen(3000, ()=>console.log('Listening in port 3000...')); 