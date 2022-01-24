const Builds = require('../models/build');

module.exports.displayBuild = function (req, res) {
    let buildName = req.query.number;

    Builds.find({ name: buildName }, function (err, build) {
        if (err || build.length === 0)
        {
            console.log("No such build found");
            return res.redirect('back');
        }

        return res.render('build', {
            title: buildName[0].toUpperCase() + buildName.slice(1),
            email: req.session.email ? req.session.email : undefined,
            build: build[0],
            layout: false
        })
    });
};

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
