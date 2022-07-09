
const users = require('../database/users');

function getAllUsers (req,res) {
    try {
    res.json(users);
    } catch (e) {
        res.status(400).json(e.message || 'Unknown error');
    }
}

function getById (req, res, next) {
    try {
        console.log(req.query);

        const {model = ''} = req.query;

        console.log(model);

        const modelToFind = model.split(';');

        console.log(modelToFind);

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

        res.json(user);
    } catch (e) {
        res.status(400).json(e.message || 'Unknown error');
    }
}

function updateUser(req, res) {
    try {
        users.push({
            name: 'TEST',
            age: Math.random() * 100
        });

        res.status(201).json('User was updated');
    } catch (e) {
        res.status(400).json(e.message || 'Unknown error');
    }
}

function createUser (req,res) {
    try {
    console.log(req.body);
    res.status(201).json('User was created');
    } catch (e) {
        res.status(400).json(e.message || 'Unknown error');
    }
}

function deleteUser (req,res) {
    try {
        users.push({
            name: 'TEST',
            age: Math.random() * 100
        });

        res.status(201).json('User was deleted');
    } catch (e) {
        res.status(400).json(e.message || 'Unknown error');
    }
}


module.exports = {
    createUser,
    deleteUser,
    getAllUsers,
    getById,
    updateUser
}

// module.exports = {
//     createUser: () => {
//     }
// }