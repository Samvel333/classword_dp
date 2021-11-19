const { body } = require('express-validator');

const userValidations = [
    body('name')
        .notEmpty().withMessage('Field is required')
        .isLength({ min: 3 }).withMessage('Required minimal 3 character'),
    body('gender').isIn(['male', 'female']),
    body('dob').notEmpty().isDate()
];

module.exports = userValidations