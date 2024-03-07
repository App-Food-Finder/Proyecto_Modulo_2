require('dotenv').config()

const logger = require('morgan');
const express = require('express');
const routes = require('./configs/routes.config.js');
const app = express();

require('./configs/db.config');
require('./configs/hbs.config')

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));
app.use(logger('dev'));
app.use(express.urlencoded());

const session = require('./configs/session.config')
app.use(session.session)
app.use(session.loadUser)



app.use('/', routes);
app.listen(3000, () => console.info('Application ready'));