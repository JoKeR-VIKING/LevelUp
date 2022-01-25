const Wishlist = require('../models/wishlist');

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
