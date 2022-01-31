const express = require('express');
const router = express.Router();
const buildController = require('../controller/buildController');
const passport = require('passport');

router.get('/', buildController.displayBuild);
router.get('/all', buildController.displayAll);
router.get('/filter', buildController.filter);

router.use('/wishlist', passport.checkAuthentication, require('./wishlistRouter'));

module.exports = router;