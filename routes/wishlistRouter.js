const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlistController');

router.get('/add', wishlistController.add);
router.get('/remove', wishlistController.remove);
router.get('/display', wishlistController.display);

module.exports = router;