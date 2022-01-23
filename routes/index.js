const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');

router.get('/', homeController.home);
router.use('/users', require('../routes/userRouter'));
router.use('/builds', require('../routes/buildRouter'));

module.exports = router;