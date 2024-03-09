const createError = require('http-errors');
const List = require('../models/list.model');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
    res.render('lists/create');
}

module.exports.doCreate = (req, res, next) => {
    const list = req.body;
    
    list.owner = req.user.id;

    List.create(list)
        .then(() => res.redirect('/lists'))
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res
                    .status(400)
                    .render('lists/create', { list, errors: error.errors });
            } else {
                next(error);
            }
        });
}

module.exports.viewLists = (req, res, next) => {
    List.find()
        .then((lists) => res.render('lists/lists', { lists }))
        .catch(next)
}

module.exports.detail = (req, res, next) => {
    const id = req.params.id;
    
    List.findById(id)
        .then((lists) => {
            if (lists) {
                res.render('lists/detail', { lists })
            } else {
                next(createError(404, 'List not found'))
            }
        })
        .catch(next)
}

module.exports.edit = (req, res, next) => {
    const id = req.params.id
    List.findById(id)
        .then((lists) => {
            if (lists) {
                res.render('lists/edit', { lists })
            } else {
                next(createError(404, 'List not found'))
            }
        })
        .catch(next);
}

module.exports.delete = (req, res, next) => {
    const id = req.params.id

    List.findById(id)
        .then((lists) => {
            if(!lists) {
                next(createError(404, 'List not found!'))
            } else if (lists.owner != req.user.id) {
                next(createError(403, 'Forbidden!'))
            } else {
                return List.deleteOne( { _id: id} )
                    .then(() => res.redirect('/lists'));
            }
        })
        .catch(next);
}