const { body } = require('express-validator');
const {getUserByEmail, getByUsername} = require("../database/getdata");

const memberValidation = [
    body('first_name').notEmpty().isLength({ min: 4, max: 255 })
        .withMessage("Required minimal 4 characters & maximal 255 characters"),

    body('last_name').notEmpty()
        .isLength({ min: 4, max: 255 }).withMessage("Required minimal 4 characters & maximal 255 characters"),

    body('username').notEmpty()
        .isLength({ min: 3, max: 100 }).withMessage("Required minimal 3 characters & maximal 100 characters")
        .custom(async (value) => {
            let data = await getByUsername(value);
            if (data.length) {
                return Promise.reject('Username already in use');
            }

            return true;
        }),
    body('email').notEmpty().isEmail()
        .isLength({ max: 100 }).withMessage("Max characters: 100")
        .custom(async (value) => {
            let data = getUserByEmail(value);
            if (data.length) {
                return Promise.reject('Email already in use');
            }

            return true;
        }),
    body("date_of_birth").isAfter("1921-01-01").withMessage("Minimum age is 1900-01-01")
        .isBefore("2003-01-01").withMessage("Maximum age is 2003-01-01").isDate()
];

module.exports = memberValidation