const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');

router.get('/', homeController.home);
router.use('/users', require('../routes/userRouter'));
router.use('/builds', require('../routes/buildRouter'));
router.use('/admin', require('../routes/adminRouter'));

module.exports = router;