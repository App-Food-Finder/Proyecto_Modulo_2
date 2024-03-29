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
            lowercase: true,
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
            minLength: [9, 'Phone number must have at least 9 characters']
        },
        description: {
            type: String,
            maxLength: [140, 'Description can not contain more than 140 characters']
        },
        photo: {
            type: String,
            default: 'https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de.jpg'
        }
    },
    { timestamps: true }
);

userSchema.virtual('userLists', {
    ref: 'UserLists',
    localField: '_id',
    foreignField: 'user'
})

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