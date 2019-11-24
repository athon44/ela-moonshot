const express = require('express');
const AnwsersController = require("./controllers/AnswersController");

const routes = express.Router();

routes.get('/transcripts', AnwsersController.getAnswers);

module.exports = routes;