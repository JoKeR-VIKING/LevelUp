const Builds = require('../models/build');
const Wishlist = require('../models/wishlist');

module.exports.displayBuild = function (req, res) {
    if (!req.query.number)
        return res.redirect('/builds/all');

    let buildName = req.query.number;

    Builds.find({ name: buildName }, function (err, build) {
        if (err || build.length === 0)
        {
            console.log("No such build found");
            return res.redirect('back');
        }

        Wishlist.find({ name: buildName }, function (err, wishlisted_build) {
            if (err)
            {
                console.log("Unable to check if build is wishlisted");
                return res.redirect('back');
            }

            let result;

            if (wishlisted_build.length === 0)
                result = false;
            else
                result = wishlisted_build[0].wishlistedUsers.includes(req.session.email);

            return res.render('build', {
                title: buildName[0].toUpperCase() + buildName.slice(1),
                email: req.session.email ? req.session.email : undefined,
                build: build[0],
                wishlisted: result,
                layout: false
            });
        });
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
            title: "Level Up | Build Display",
            builds: builds,
            filter_option: "All",
            range: [0, 1000000],
            email: req.session.email ? req.session.email : undefined,
            layout: "allBuilds"
        });
    });
};

module.exports.filter = function (req, res) {
    let range;

    if (req.query.filter === "All")
        range = [0, 1000000];
    else
        range = req.query.filter.split(";");

    Builds.find({}, function (err, builds) {
        if (err)
        {
            console.log("Cannot fetch builds");
            return res.redirect('back');
        }

        builds.sort(function (obj1, obj2) {
            return obj1.price - obj2.price;
        });

        let filter_option;

        if (req.query.filter !== "All" && req.query.filter !== "Most Popular")
            filter_option = "₹" + (range[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + " - " + "₹" + (range[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        else
            filter_option = req.query.filter;

        range = [parseInt(range[0]), parseInt(range[1])];

        return res.render('allBuilds', {
            title: "Level Up | Build Display",
            builds: builds,
            filter_option: filter_option,
            range: range,
            email: req.session.email ? req.session.email : undefined,
            layout: "allBuilds"
        });
    });
};
