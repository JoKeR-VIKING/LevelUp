module.exports.home = function (req, res) {
    return res.render('home', {
        title: "Level Up | Home",
        email: req.session.email ? req.session.email : undefined,
        layout: "homeLayout"
    });
};
