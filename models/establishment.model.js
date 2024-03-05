const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const establishmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            maxLength: 140
        },
        //photo:
        foodType: {
            type: [String],
            required: true
        },
        location: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
)

const Establishment = mongoose.model('Establishment', establishmentSchema);

module.exports = Establishment;