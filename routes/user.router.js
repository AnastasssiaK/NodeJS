const userRouter = require('express').Router();

const userController = require("../controllers/user.controller");
const userMdlwr = require('../middlewares/user.middleware');

userRouter.get('/', userController.getAllUsers);
userRouter.post('/',userMdlwr.checkUserOnCreate, userController.createUser);
userRouter.delete('/:userId', userController.deleteUser);
userRouter.get('/:userId', userController.getById);
userRouter.put('/:userId', userController.updateUser);

module.exports = userRouter;