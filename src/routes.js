const express = require('express');
const AnwsersController = require("./controllers/AnswersController");

const routes = express.Router();

routes.get('/answers/:user/:command', AnwsersController.getAnswers);

module.exports = routes;