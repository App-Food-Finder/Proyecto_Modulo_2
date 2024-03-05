require('dotenv').config()

const logger = require('morgan');
const express = require('express');
const routes = require('./configs/routes.config.js');
const app = express();

require('./configs/db.config');

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(logger('dev'));
app.use(express.urlencoded());

app.use('/', routes);
app.listen(3000, () => console.info('Application ready'));