const Joi = require('joi');

const {PASSWORD_REGEX} = require('../constants/constant');
const {emailValidator} = require("./share");
const User = require('../database/User');
const CError = require('../error/CustomError');

const userSubScheme = {
    name: Joi.string().alphanum().min(2).max(100).required(),
    age: Joi.number().integer().min(1).max(130),
};

const testArraySubSchema = Joi.object({
    car: Joi.boolean()
});


module.exports = {
    newUserValidator: Joi.object({
        ...userSubScheme,
        email: emailValidator.required(),
        password: Joi.string().required().regex(PASSWORD_REGEX)
    }),

    updateUserValidator: Joi.object(userSubScheme),

    testValid: Joi.object({
        isAdult: Joi.boolean(),
        array: Joi.array().items(testArraySubSchema).when('isAdult', {is: true, then: required()})
    })
};