const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
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

const EstablishmentList = mongoose.model('EstablishmentList', schema);
module.exports = EstablishmentList;