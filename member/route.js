const express = require('express');
const route = express.Router();
const { Member } = require('./controller');
const {memberValidation} = require('./validation');

route.get('/', Member.index);
route.get('/:id', Member.show);
route.post('/', memberValidation, Member.create);
route.put('/:id', memberValidation, Member.update);
route.delete('/:id', Member.destroy);

module.exports = { route }