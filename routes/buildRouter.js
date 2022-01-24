const express = require('express');
const router = express.Router();
const buildController = require('../controller/buildController');

router.get('/', buildController.displayBuild);
router.get('/all', buildController.displayAll);

module.exports = router;