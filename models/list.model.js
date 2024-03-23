const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            minLength: [5, 'Title must contain at least 5 characters']
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
        pictures:{
            type: [String],
            default: 'https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp'
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