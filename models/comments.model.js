const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: [true, 'Empty comment'],
            maxLength: [140, 'Comments can not contain more than 140 characters']
        },
        establishment: {
            type: mongoose.Types.ObjectId,
            ref: 'Establishment',
            required: true
        }
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;