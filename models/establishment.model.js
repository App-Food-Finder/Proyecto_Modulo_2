const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const establishmentSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            required: true,
            maxLength: 140
        },
        //photo:
        foodType: {
            type: [String],
            required: [true, 'Please, indicate at least one food type']
        },
        location: {
            type: String,
            required: [true, 'Location is required']
        },
        price: {
            type: Number,
            required: [true, 'Indicate an average price']
        }
    },
    { timestamps: true }
)

const Establishment = mongoose.model('Establishment', establishmentSchema);

module.exports = Establishment;