const Wishlist = require('../models/wishlist');
const Builds = require('../models/build');
const async = require('async');

module.exports.add = function (req, res) {
    let buildName = req.query.number;

    Wishlist.find({ name: buildName }, function (err, build) {
        if (err)
        {
            console.log("Unable to fetch builds");
            return res.redirect('back');
        }
        if (build.length === 0)
        {
            Wishlist.create({
                name: buildName,
                wishlistedUsers: [req.session.email]
            });

            return res.redirect('back');
        }
        else
        {
            let newUserList = build[0].wishlistedUsers;

            if (!newUserList.includes(req.session.email))
                newUserList.push(req.session.email);

            Wishlist.findOneAndUpdate({ name: buildName }, {$set: {
                wishlistedUsers: newUserList
            }}, {
                new: true
            }, function (err, build) {
                if (err)
                    console.log("Unable to add to wishlist");

                return res.redirect('back');
            });
        }
    });
};

module.exports.remove = function (req, res) {
    let buildName = req.query.number;

    Wishlist.find({ name: buildName }, function (err, build) {
        if (err)
        {
            console.log("Unable to fetch builds");
            return res.redirect('back');
        }
        if (build.length === 0)
            return res.redirect('back');
        else
        {
            let newUserList = build[0].wishlistedUsers;
            const index = newUserList.indexOf(req.session.email);
            newUserList.splice(index, 1);

            Wishlist.findOneAndUpdate({ name: buildName }, {$set: {
                wishlistedUsers: newUserList
            }}, {
                new: true
            }, function (err, build) {
                if (err)
                    console.log("Unable to add to wishlist");

                return res.redirect('back');
            });
        }
    });
};

module.exports.display = function (req, res) {
    let userBuilds = [];

    Wishlist.find({}, function (err, builds) {
        if (err)
        {
            console.log("Cannot fetch wishlisted builds");
            return res.redirect('back');
        }

        async.forEachOf(builds, function (build, key, callback) {
            Builds.find({ name: build.name }, function (err, detailBuild) {
                if (err)
                {
                    console.log("Cannot fetch detail from wishlisted builds");
                    return res.redirect('back');
                }
                if (build.wishlistedUsers.includes(req.session.email))
                    userBuilds.push(detailBuild[0]);

                callback();
            });
        }, function (err) {
            if (err)
            {
                console.log("Error in rendering page");
                return res.redirect('back');
            }

            return res.render('wishlist', {
                title: "Wishlist | " + req.session.name.split(' ')[0],
                email: req.session.email ? req.session.email : undefined,
                builds: userBuilds,
                layout: false
            });
        });
    });
};
