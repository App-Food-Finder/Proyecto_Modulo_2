const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addToListSchema = new Schema(
    {
        establishment: {
            type: mongoose.Types.ObjectId,
            ref: 'Establishment',
            required: true
        },
        list: {
            type: mongoose.Types.ObjectId,
            ref: 'List',
            required: true
        }
    },
    { timestamps: true }
);

const AddToList = mongoose.model('AddToList', addToListSchema);
module.exports = AddToList;