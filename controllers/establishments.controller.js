const createError = require('http-errors');
const Establishment = require('../models/establishment.model');
const mongoose = require('mongoose');


module.exports.search = (req, res, next) => {
    Establishment.find()
        .then((establishments) => res.render('establishments/feed', { establishments }))
        .catch(next);
}


module.exports.create = (req, res, next) => {
    res.render('establishments/create')
} 

module.exports.doCreate = (req, res, next) => {
    const establishment = req.body;

    Establishment.create(establishment)
        .then((establishment) => res.redirect('/establishments'))
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res
                    .status(400)
                    .render('establishments/create', { establishment, error: error.errors });
            } else {
                next(error);
            }
        });
};




/** TODO:
 * Funciones:
    - doCreate
    - delete
    - details
    - edit

 * Crear lista de favoritos donde:
    - Guardar establecimientos ya creados que nos gusten, y poder eliminarlos de favoritos
    - Funciones:
        - favorite
        - deleteFavorite
*/