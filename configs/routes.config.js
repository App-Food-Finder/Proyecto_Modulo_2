const express = require('express');
const users = require('../controllers/users.controller');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.redirect('/signup');
})

router.get('/signup', users.create);
router.post('/signup', users.doCreate);

router.get('/login', users.login);
router.post('/login', users.doLogin);

router.get('/profile', users.profile);

module.exports = router;