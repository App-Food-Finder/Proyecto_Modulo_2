/** 

1 : N

1 usuario -> (puede tener) -> n listas

1 lista -> (puede pertenecer) -> 1 usuario

1 lista -> (puede tener) -> n establecimientos

1 establecimientos -> (puede pertenecer) -> n listas

*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        establishment: {
            type: String,
            required: true
        },
        description: {
            type: String,
            maxLength: 140
        },
        /**owner: {
            type: mongoose.Types.ObjectId,
            ref:'User',
            require: true
        },*/
        city: {
            type: String,
            require: true
        }
    },
    { timestamps: true }
);

const List = mongoose.model('List', listSchema);

module.exports = List