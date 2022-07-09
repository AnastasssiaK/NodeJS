const express = require('express');
const axios = require('axios');

const users = require('./database/users');
const userController = require('./controllers/user.controller');
const userRouter = require('./routes/user.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
    console.log(req);

    const resp = await axios.get('https://jsonplaceholder.typicode.com/users');

    res.status(resp.status).json(resp.data);
});

app.use('./users', userRouter);

app.use('*', (req,res) => {
    req.status(404).json('Route not found');
})

app.listen(5000, () => {
    console.log('Server listen 5000')
});