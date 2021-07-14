const express = require('express');
const UrlRoutes = express.Router();

const controller = require('../Controller/users.controller')

UrlRoutes.get('/', controller.listItem)
UrlRoutes.post('/', controller.createItem)
UrlRoutes.get('/:id', controller.readItem)
UrlRoutes.put('/:id', controller.updateItem)
UrlRoutes.delete('/:id', controller.deleteItem)

module.exports = UrlRoutes;
