const express = require('express');
const methodOverride = require('method-override');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); 
app.set('view engine', 'ejs');

let tasks = [
    { id: 1, text: 'Learn Express', priority: 'Medium', completed: false },
    {id: 2, text: 'Learn React', priority: 'Low', completed: false},
    {id: 3, text: 'Learn Javascript', priority: 'High', completed: false}
];

app.get('/', (req, res) => res.render('index', { tasks }));

app.post('/add', (req, res) => {
    tasks.push({ id: Date.now(), text: req.body.text, priority: req.body.priority, completed: false });
    res.redirect('/');
});

app.delete('/delete/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.redirect('/');
});

app.put('/toggle/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (task) task.completed = !task.completed;
    res.redirect('/');
});

app.listen(3000);