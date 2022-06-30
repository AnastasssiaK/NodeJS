const express = require('express');
const fs = require('fs/promises');
const axios = require('axios');
const users = require('./database/users');

const app = express();

app.get('/', async (req, res) => {
   // const buffer = await fs.readFile('asasasas');
   // res.json(buffer.toString());

    console.log(req);

    const resp = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.status(resp.status).json(resp.data);

    // res.json('HELLO EXPRESS');
    // res.write('HELLO EXPRESS');
    // res.status(404).json( 'NOT FOUND');
    console.log('TEST');
    // res.end();

    console.log()
});

app.get('/users', (req, res) => {
    res.json(users)
});

//CREATE
//app.post('/users'
app.get('/users/:userName/create', (req, res) => {
    users.push({
        name: req.params.userName,
        age: Math.random()*100
    });

    res.status(201).json('User was created')
});

//app.put('/users/:userId')
app.get('/users/:userId/update', (req, res) => {
});
//app.delete('/users/:userId')
app.get('/users/:userId/delete', (req, res) => {
});


app.get('/users/:userId', (req, res, next) => {
    const userIndex = +req.params.userId;

    if (isNaN(userIndex) || userIndex < 0) {
        res.status(400).json('Please enter valid ID');
    return;
    }
    const user = users[userIndex];

    if (!user) {
        res.status(400).json(`User with ID ${userIndex} is not found `);
        return;
    }

    // console.log(req.params);
    // console.log(`Customer want to get user with ID ${userIndex}`);

    res.json(user);
});



app.listen(5000, () => {
    console.log('Server listen 5000')
});