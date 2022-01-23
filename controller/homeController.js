module.exports.home = function (req, res) {
    return res.render('home', {
        title: "Level Up",
        layout: "homeLayout"
    });
};
