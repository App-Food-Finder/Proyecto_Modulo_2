const User = require('../models/user.model');
const mongoose = require('mongoose');
const List = require('../models/list.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
    res.render('users/signup');
};

module.exports.doCreate = (req, res, next) => {
    const user = req.body;

    User.findOne({ username: user.username })
        .then((userFound) => {
            if (userFound) {
                res.status(409).render('users/signup', { userFound, errors: { username: 'Already exists' } });
            } else {
                return User.create(user)
                    .then(() => res.redirect('/login'))
            }
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('users/signup', { user, errors: error.errors });
            } else {
                next(error);
            }
        });
};

module.exports.login = (req, res, next) => {
    res.render('users/login');
};

module.exports.doLogin = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((userFound) => {
            if (userFound) {
                return userFound.checkPassword(req.body.password)
                    .then((match) => {
                        if (match) {
                            req.session.userId = userFound.id;
                            res.redirect('/profile');
                        } else {
                            res.status(401).render('users/login', { userFound: req.body, errors: { password: 'Invalid username or password' } });
                        }
                    })
            } else {
                res.status(401).render('users/login', { userFound: req.body, errors: { password: 'Invalid username or password' } });
            }
        })
        .catch(next);
};

module.exports.profile = (req, res, next) => {
    List.find()
        .then((lists) => res.render('users/profile', { lists }))
        .catch(next);
};


module.exports.logout = (req, res, next) => {
    req.session.destroy();
    req.session = null;
    res.clearCookie('connect.sid');
    res.redirect('/login');
};

module.exports.edit = (req, res, next) => {
    res.render('users/edit', { user: req.user });
};


module.exports.doEdit = (req, res, next) => {

    const {
        username,
        name,
        email,
        phone,
        description
    } = req.body;
    
    const body = {
        username,
        name,
        email,
        phone,
        description
    }
    if (req.file) {
        body.photo = req.file.path
    }

    Object.assign(req.user, body)
        .save()
        .then(() => res.redirect('/profile'))
        .catch(next);
};


module.exports.delete = (req, res, next) => {
    const userId = req.user.id;

    User.findById(userId)
        .then((user) => {
            if (!user) {
                next(createError(404, 'User not found'));
            } else {
                return User.deleteOne({ _id: userId })
                    .then(() => res.redirect('/signup'));
            }
        })
};