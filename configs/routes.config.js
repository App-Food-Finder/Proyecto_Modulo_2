const express = require('express');
const users = require('../controllers/users.controller');
const home = require('../controllers/home.controller');
const lists = require('../controllers/lists.controller');
const establishments = require('../controllers/establishments.controller');
const comment = require('../controllers/comments.controller');
const secure = require('../middlewares/auth.middleware');
const parser = require('../configs/multer.config');
const router = express.Router();

//USERS//
router.get('/', (req, res, next) => {
    res.redirect('/login');
})

//HOME//
router.get('/home', secure.isAuthenticated, home.home);

//USERS//
router.get('/signup', users.create);
router.post('/signup', users.doCreate);

router.get('/login', users.login);
router.post('/login', users.doLogin);

router.get('/logout', users.logout);

router.get('/profile', secure.isAuthenticated, users.profile);

router.get('/users/:id/edit', secure.isAuthenticated, users.edit);
router.post('/users/:id/edit', secure.isAuthenticated, parser.single('profile'), users.doEdit);

router.post('/delete', secure.isAuthenticated, users.delete);

//LISTS//
router.get('/create-list', secure.isAuthenticated, lists.create);
router.post('/create-list', secure.isAuthenticated, lists.doCreate);

router.get('/lists', secure.isAuthenticated, lists.viewLists);
router.get('/lists/:id', secure.isAuthenticated, lists.detail);

router.get('/lists/:id/edit', secure.isAuthenticated, lists.edit);
router.post('/lists/:id/edit', secure.isAuthenticated, lists.doEdit);

router.get('/lists/:id/delete', secure.isAuthenticated, lists.delete);

router.post('/lists/:listId/establishments/:establishmentId/delete', secure.isAuthenticated, lists.deleteFromList);

//ESTABLISHMENTS//
router.get('/establishments', secure.isAuthenticated, establishments.search);
router.get('/establishments/:id', secure.isAuthenticated, establishments.detail);

router.get('/establishments/:id/add-to-list', secure.isAuthenticated, establishments.addToList);
router.post('/establishments/:id/add-to-list', secure.isAuthenticated, establishments.doAddToList);

router.get('/create-establishment', secure.isAuthenticated, establishments.create);
router.post('/create-establishment', secure.isAuthenticated, parser.single('establishment-photo'), establishments.doCreate);

//COMMENTS
router.post('/establishments/:establishmentId/comments', secure.isAuthenticated, comment.doCreate);
router.post('/establishments/:establishmentId/comments/:id/delete', secure.isAuthenticated, comment.doDelete);

module.exports = router;
