const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const passport = require('passport');

router.get('/login', userController.login);
router.get('/signup', userController.signup);

router.post('/newUser', userController.newUser);
router.post('/oldUser', passport.authenticate('local', {
    failureRedirect: '/users/login'
}), userController.createSession);

router.get('/signout', userController.signout);

module.exports = router;