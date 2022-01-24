const Builds = require('../models/build');

module.exports.displayAll = function (req, res) {
    Builds.find({}, function (err, builds) {
        if (err)
        {
            console.log("Cannot fetch builds");
            return res.redirect('back');
        }

        builds.sort(function (obj1, obj2) {
            return obj1.price - obj2.price;
        });

        return res.render('allBuilds', {
            title: "Build Display",
            builds: builds,
            i: 0,
            email: req.session.email ? req.session.email : undefined,
            layout: "allBuilds"
        });
    });
};
