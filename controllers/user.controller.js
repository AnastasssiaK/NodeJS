const CError = require('../error/CustomError');
const User = require('../database/User');

async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        console.log(users)
        res.json(users);
    } catch (e) {
        next(e);
    }
}

async function getById(req, res, next) {
    try {
        const {userId = ''} = req.params;

        if (userId.length !== 24) {
            throw new CError (`Mongo Id is not valid`, 404);
        }

        const user = await User.findOne({_id: userId});

        if (!user) {
            throw new CError (`User with ID ${userId} is not found`, 404);
        }

        res.json(user);
    } catch (e) {
        next(e);
    }
}

async function updateUser(req, res, next) {
    try {
        // users.push({
        //     name: 'TEST',
        //     age: Math.random() * 100
        // });

        res.status(201).json('User was updated');
    } catch (e) {
        next(e);
    }
}

async function createUser(req, res, next) {
    try {
        console.log(req.body);

       const user =  await User.create(req.body);

        res.status(201).json(user);
    } catch (e) {
        next(e);
    }
}

async function deleteUser(req, res, next) {
    try {
        const {userId = ''} = req.params;

        // await User.findByIdAndDelete(userId);
        await User.deleteOne({_id: userId});

        res.status(201).json('User was deleted');
    } catch (e) {
        next(e);
    }
}


module.exports = {
    createUser,
    deleteUser,
    getAllUsers,
    getById,
    updateUser
}