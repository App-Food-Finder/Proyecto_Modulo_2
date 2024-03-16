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
            required: [true, 'Title is required'],
            minLength: [5, 'Title must contain at least 5 characters']
        },
        establishment: {
            type: String,
            required: [true, 'You must indicate an establishment']
        },
        description: {
            type: String,
            maxLength: [140, 'Description can not contain more than 140 characters']
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref:'User',
            required: true
        },
        city: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

listSchema.virtual('added', {
    ref: 'EstablishmentList',
    localField: '_id',
    foreignField: 'list',
    justOne: false
});

const List = mongoose.model('List', listSchema);

module.exports = List