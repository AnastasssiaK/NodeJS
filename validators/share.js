const Joi = require("joi");

const {EMAIL_REGEX} = require("../constants/constant");

module.exports = {
    emailValidator: Joi.string().lowercase().regex(EMAIL_REGEX),
}