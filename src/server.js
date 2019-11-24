const express = require('express');
const config = require('config');

const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(routes);

app.listen(config.get('port'), () => console.log('==> Rodando!'));