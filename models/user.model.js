const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true
        },
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: 5
        },
        phone: {
            type: Number,
            required: [true, 'Phone number is required'],
            unique: true,
            minLength: [9, 'Number must have at least 9 characters']
        }
        //keyFood:
    },
    { timestamps: true }
);


userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10)
            .then((hash) => {
                this.password = hash
                next();
            })
            .catch(next);
    } else {
        next();
    }
});


userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};

//Enviar email???

const User = mongoose.model('User', userSchema);

module.exports = User;