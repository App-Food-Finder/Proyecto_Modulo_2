const AddToList = require('../models/addToList.model');
const Establishment = require('../models/establishment.model');
const List = require('../models/list.model');
const mongoose = require('mongoose');
const createError = require('http-errors')

module.exports.add = (req, res, next) => {
    const { listId } = req.params
    List.findById(listId)
        .populate('establishment')
        .then((list) => {
            if (!list) {
                next(createError(404, 'List not found'))
            } else {
                const addToList = req.body;
                addToList.establishment = req.establishment.id;
                addToList.list = listId;

                return AddToList.findOneAndUpdate({ _id:id, list: listId })
                    .then(() => res.redirect(`/lists/${listId}`))
            }
        }).catch(next);
}

