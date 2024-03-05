const User = require('../models/user.model');
const mongoose = require('mongoose')

module.exports.create = (req, res, next) => {
    res.render('users/signup');
}

module.exports.doCreate = (req, res, next) => {
    const user = req.body;

    User.findOne({username: user.username})
        .then((userFound) => {
            if (userFound) {
                res.status(409).render('users/signup', { userFound, errors: { username: 'Already exists' }});
            } else {
                return User.create(user)
                    .then(() => res.redirect('/login'))
            }
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('users/signup', { user, errors: error.errors })
            } else {
                next(error)
            }
        });
};