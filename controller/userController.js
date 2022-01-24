const bcrypt = require('bcrypt');
require('../config/userConnection');
const Users = require('../models/users');

module.exports.login = function (req, res) {
    if (req.isAuthenticated())
    {
        return res.redirect('/');
    }

    return res.render('login', {
        title: "Login",
        email: undefined,
    });
};

module.exports.signup = function (req, res) {
    if (req.isAuthenticated())
    {
        return res.redirect('/');
    }

    return res.render('signup', {
        title: "Sign Up",
        email: undefined,
    });
};

module.exports.newUser = function (req, res) {
    Users.find({email: req.body.email}, async function (err, user) {
        if (err)
        {
            console.log("Cannot find users");
            return res.redirect('back');
        }
        if (user.length === 1)
        {
            req.flash('alreadyExists', 'User already exists');
            return res.redirect('/users/login');
        }
        if (req.body.password !== req.body.confirmPassword)
        {
            req.flash('noMatch', 'Passwords do not match');
            return res.redirect('back');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        Users.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }, function (err) {
            if (err)
            {
                console.log("User creation failed");
                return res.redirect('back');
            }

            req.flash('successUser', 'User successfully created')
            return res.redirect('/users/login');
        });
    });
};

module.exports.createSession = function (req, res) {
    req.session.email = req.body.email;
    return res.redirect('/');
};

module.exports.signout = function (req, res) {
    req.logout();
    req.session.email = undefined;
    return res.redirect('/users/login');
};