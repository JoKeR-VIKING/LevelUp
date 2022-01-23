const Builds = require('../models/build');

module.exports.displayAll = function (req, res) {
    Builds.find({}, function (err, builds) {
        if (err)
        {
            console.log("Cannot fetch builds");
            return res.redirect('back');
        }

        return res.render('builds', {
            title: "Build Display",
            builds: builds,
            layout: "buildDisplayLayout"
        });
    });
};
