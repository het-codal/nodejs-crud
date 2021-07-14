const express = require('express');
const UrlRoutes = express.Router();

const controller = require('../Controller/auth.controller')

UrlRoutes.post('/', controller.login)

module.exports = UrlRoutes;
