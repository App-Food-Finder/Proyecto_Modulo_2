const createError = require('http-errors');
const Establishment = require('../models/establishment.model');
const mongoose = require('mongoose');
const List = require('../models/list.model');
const EstablishmentList = require('../models/establishment-list.model');


module.exports.search = (req, res, next) => {
    Establishment.find()
        .then((establishments) => res.render('establishments/feed', { establishments }))
        .catch(next);
}


module.exports.create = (req, res, next) => {
    res.render('establishments/create')
} 

module.exports.detail = (req, res, next) => {
    const id  = req.params.id;

    Establishment.findById(id)
        .populate({
            path: 'comments',
            populate: {
                path: 'owner'
            }
        })
        .then((establishment) => {
            if (!establishment) {
                next(createError(404, 'Establishment not found'));
            } else {
                res.render('establishments/detail', { establishment });
            }
        })
        .catch(next);
};

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

module.exports.addToList = (req, res, next) => {
    List.find()
        .then(lists => {
            res.render('establishments/add-to-list', {
                lists,
                establishmentId: req.params.id
            })
        })
    
}

module.exports.doAddToList = (req, res, next) => {
    EstablishmentList.create({
        list: req.body.list,
        establishment: req.params.id
    })
        .then((list) => {
            res.redirect('/lists');
        })
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params;
    return Establishment.findById(id)
        .then((establishment) => {
            if (!establishment) {
                next(createError(404, 'Establishment not found'));
            } else if (list.owner != req.user.id ) {
                next(createError(403, 'No PUEDES PASAAAAAR!'));
            } else {
                return Establishment.deleteOne({ _id: id })
                    .then(() => res.redirect(`/lists`));
            }
        }).catch(next);
}