const Builds = require('../models/build');
const Wishlist = require('../models/wishlist');
const Compatible = require('../models/compatible');
const Prices = require('../models/prices');
const async = require('async');

module.exports.displayBuild = function (req, res) {
    if (!req.query.number)
        return res.redirect('/builds/filter?filter=Most Popular');

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
                newbuild: false,
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
        {
            if (req.query.filter === "Most Popular")
            {
                Wishlist.find({}, function (err, builds) {
                    if (err || builds.length === 0)
                    {
                        console.log("Cannot get wishlisted builds");
                        return res.redirect('back');
                    }

                    builds = builds.filter(build => build.wishlistedUsers.length >= 3);
                    builds.sort(function (obj1, obj2) {
                        if (obj1.wishlistedUsers.length === obj2.wishlistedUsers.length)
                            return obj1.price - obj2.price;

                        return obj2.wishlistedUsers.length - obj1.wishlistedUsers.length;
                    });
                    builds = builds.slice(0, 3);

                    let popularBuilds = [];

                    async.forEachOf(builds, function (build, key, callback) {
                        Builds.find({ name: build.name }, function (err, detailBuild) {
                            if (err)
                            {
                                console.log("Cannot fetch detail from wishlisted builds");
                                return res.redirect('back');
                            }

                            popularBuilds.push(detailBuild[0]);
                            callback();
                        });
                    }, function (err) {
                        if (err)
                        {
                            console.log("Error in rendering page");
                            return res.redirect('back');
                        }

                        return res.render('allBuilds', {
                            title: "Level Up | Build Display",
                            builds: popularBuilds,
                            filter_option: filter_option,
                            range: [0, 1000000],
                            email: req.session.email ? req.session.email : undefined,
                            layout: "allBuilds"
                        });
                    });
                });

                return;
            }

            filter_option = req.query.filter;
        }

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

module.exports.create = function (req, res) {
    Compatible.find({}, function (err, motherboards) {
        if (err)
        {
            console.log("Unable to find components");
            return res.redirect('back');
        }

        return res.render('create', {
            title: "Level Up | Create",
            selected_motherboard: undefined,
            motherboards: motherboards,
            cpus: [],
            gpus: [],
            rams: [],
            storages: [],
            psus: [],
            total_price: 0,
            email: req.session.email
        });
    });
};

module.exports.change = function (req, res) {
    Compatible.find({}, function (err, motherboards) {
        if (err || motherboards.length === 0)
        {
            console.log("Cannot fetch motherboard");
            return res.redirect('back');
        }

        Compatible.find({ motherboard: req.query.motherboard }, async function (err, motherboard) {
            if (err || motherboards.length === 0)
            {
                console.log("Cannot fetch motherboard");
                return res.redirect('back');
            }

            let total_price = 0;
            let selected_motherboard = req.query.motherboard;

            if (selected_motherboard)
            {
                const prices = await Prices.find({ name: selected_motherboard.toString().toLowerCase() });
                total_price += prices[0].price[2];
            }

            return res.render('create', {
                title: "Level Up | Create",
                motherboards: motherboards,
                selected_motherboard: selected_motherboard,
                cpus: motherboard[0].cpuList,
                gpus: motherboard[0].gpuList,
                rams: motherboard[0].ramList,
                storages: motherboard[0].storageList,
                psus: motherboard[0].power_supplyList,
                total_price: total_price,
                email: req.session.email
            });
        });
    });
};

module.exports.getnew = async function (req, res) {
    let selected_motherboard = req.body.motherboard.toString().toLowerCase(),
        selected_cpu = req.body.cpu.toString().toLowerCase(),
        selected_gpu = req.body.gpu.toString().toLowerCase(),
        selected_ram = req.body.ram.toString().toLowerCase(),
        selected_storage = req.body.storage.toString().toLowerCase(),
        selected_psu = req.body.psu.toString().toLowerCase();

        const a = await Prices.find({ name: selected_motherboard });
        const b = await Prices.find({ name: selected_cpu });
        const c = await Prices.find({ name: selected_gpu });
        const d = await Prices.find({ name: selected_ram });
        const e = await Prices.find({ name: selected_storage });

        let f = await Prices.find({ name: selected_psu });
        if (!f)
            f = await Prices.find({ name: selected_psu + '+' });

        const buildObj = {
            name: "new build",
            avatar: "build_9.png",
            price: a[0].price[2] + b[0].price[2] + c[0].price[2] + d[0].price[2] + e[0].price[2] + f[0].price[2],
            motherboard: [a[0].name, null, null, a[0].price[3]],
            cpu: [b[0].name, null, null, b[0].price[3]],
            gpu: [c[0].name, null, null, c[0].price[3]],
            ram: [d[0].name, null, null, d[0].price[3]],
            storage: [e[0].name, null, null, e[0].price[3]],
            psu: [f[0].name, null, null, f[0].price[3]],
        }

        return res.render('build.ejs', {
            title: "Create build",
            email: req.session.email ? req.session.email : undefined,
            build: buildObj,
            wishlisted: false,
            newbuild: true,
            layout: false
        });
}
