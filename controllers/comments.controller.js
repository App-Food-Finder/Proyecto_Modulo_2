const createError = require('http-errors');
const Comment = require('../models/comments.model');
const Establishment = require('../models/establishment.model');
const mongoose = require('mongoose');


module.exports.doCreate = (req, res, next) => {
    const establishmentId = req.params.id;
        Establishment.findById(establishmentId)
        .then((establishment) => {
            if (!establishment) {
                next(createError(404, 'Establishment not found'));
            } else {
                    const comment = req.body;
                    comment.owner = req.user.id;
                    comment.establishment = establishmentId;
                    return Comment.create(comment)
                        .then(() => res.redirect(`/establishments/${establishmentId}`))
                        .catch((error) => {
                            if (error instanceof mongoose.Error.ValidationError) {
                                res.status(400).render('establishment/detail', { establishment, errors: error.errors, comment: req.body})
                            } else {
                                next(error);
                            }
                        })
                }
            })
            .catch(next);
}