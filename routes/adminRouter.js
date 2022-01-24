const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.get('/', function (req, res) {
    if (req.session.email !== "admin@admin.com")
        return res.redirect('back');

    return res.render('addBuild', {
        title: "Add Build",
        layout: false
    });
});
router.post('/add', adminController.addBuild);

module.exports = router;