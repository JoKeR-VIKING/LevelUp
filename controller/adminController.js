const Builds = require('../models/build');
const Compatible = require('../models/compatible');

module.exports.addBuild = function (req, res) {
    if (req.session.email !== "admin@admin.com")
        return res.redirect('back');

    Builds.create({
        name: req.body.name,
        motherboard: [req.body.motherboard],
        cpu: [req.body.cpu],
        gpu: [req.body.gpu],
        ram: [req.body.ram],
        storage: [req.body.storage],
        psu: [req.body.psu]
    }, function(err) {
        if (err)
            console.log("Cannot create new build");

        return res.redirect('back');
    });
};

module.exports.compatible = function (req, res) {
    if (req.session.email !== "admin@admin.com")
        return res.redirect('back');

    Compatible.find({ motherboard: req.body.motherboard }, function (err, motherboard) {
        if (err)
        {
            console.log("Cannot fetch motherboard");
            return res.redirect('back');
        }
        if (motherboard.length === 0)
        {
            Compatible.create({
                motherboard: req.body.motherboard,
                cpuList: [req.body.cpu]
            });

            return res.redirect('back');
        }
        else
        {
            let cpuList = motherboard[0].cpuList;
            cpuList.push(req.body.cpu);

            Compatible.updateOne({ motherboard: req.body.motherboard }, {$set: {
                cpuList: cpuList
            }}, {}, function (err) {
                if (err)
                    console.log("Cannot fetch motherboard");

                return res.redirect('back');
            });
        }
    });
};
