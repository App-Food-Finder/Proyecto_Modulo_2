require('dotenv').config()

const logger = require('morgan');
const express = require('express');
const routes = require('./configs/routes.config.js');
const createError = require('http-errors');
const mongoose = require('mongoose')

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

app.use((req, res, next) => next(createError(404, 'Route not found')))

app.use((error, req, res, next) => {
    if (error instanceof mongoose.Error.CastError && error.message.includes('_id')) {
        error = createError(404, 'Resource not found')
    } else if (!error.status) {
        error = createError(500, error)
    }
    console.error(error)
    res.status(error.status).render(`errors/${error.status}`)
})

app.listen(3000, () => console.info('Application ready'));