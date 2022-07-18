const CError = require('../error/CustomError');
const userValidator = require('../validators/user.validator');
const User = require("../database/User");

module.exports = {
    isNewUserValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.newUserValidator.validate(req.body);

            if (error) {
                throw new CError(error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isEmailRegistered: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw  new CError('User with such already registered');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}