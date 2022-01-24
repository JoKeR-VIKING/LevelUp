const Builds = require('../models/build');

module.exports.addBuild = function (req, res) {
    if (req.session.email !== "admin@admin.com")
        return res.redirect('back');

    console.log(req.body);

    Builds.create({
        name: req.body.name,
        motherboard: [req.body.motherboard],
        cpu: [req.body.cpu],
        gpu: [req.body.gpu],
        ram: [req.body.ram],
        storage: [req.body.storage],
        psu: [req.body.psu]
    }, function(err, build) {
        if (err)
            console.log("Cannot create new build");

        return res.redirect('back');
    });
};
