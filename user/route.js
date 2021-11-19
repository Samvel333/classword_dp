const express = require('express');
const route = express.Router();
const { User } = require('./controller');
const {userValidations} = require('./validation')

route.get('/', User.index);
route.get('/:id', User.show);
route.post('/', userValidations, User.create);
route.put('/:id', userValidations, User.update);
route.delete('/:id', User.destroy);

module.exports = { route }