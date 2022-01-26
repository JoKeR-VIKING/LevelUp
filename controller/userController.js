const bcrypt = require('bcrypt');
require('../config/userConnection');
const Users = require('../models/users');
const nodemailer = require('nodemailer');

module.exports.login = function (req, res) {
    if (req.isAuthenticated())
    {
        return res.redirect('/');
    }

    return res.render('login', {
        title: "Level Up | Login",
        email: undefined,
    });
};

module.exports.signup = function (req, res) {
    if (req.isAuthenticated())
    {
        return res.redirect('/');
    }

    return res.render('signup', {
        title: "Level Up | Sign Up",
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

            req.flash('successUser', 'User successfully created');
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
    req.session.name = undefined;
    return res.redirect('/users/login');
};

module.exports.forgot = function (req, res) {
    if (req.session.email)
        return res.redirect('back');

    return res.render('forgotPass', {
        title: "Level Up | Forgot Password",
        email: undefined,
        verify: false,
        layout: "forgotPassLayout"
    });
};

module.exports.sendEmail = async function (req, res) {
    if (req.session.email)
        return res.redirect('back');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CLIENT_MAIL,
            pass: process.env.CLIENT_PASS
        }
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    const mailOptions = {
        from: process.env.CLIENT_MAIL,
        to: req.body.email,
        subject: 'Change Password',
        text: otp
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
        {
            console.log("Mail cannot be sent" + err);
            return res.redirect('back');
        }

        req.session.otp = hashedOtp;
        req.session.matchEmail = req.body.email;

        return res.render('forgotPass', {
            title: "Level Up | Forgot Password",
            email: undefined,
            verify: true,
            layout: "forgotPassLayout"
        });
    });
};

module.exports.match = async function (req, res) {
    if (req.session.email || !req.session.otp)
        return res.redirect('back');

    const result = await bcrypt.compare(req.body.otp, req.session.otp);
    req.session.otp = undefined;

    if (result)
    {
        return res.render('changePass', {
            title: "Level Up | Change Password",
            email: undefined,
            layout: "forgotPassLayout"
        });
    }
    else
    {
        req.flash('wrongOtp', 'Incorrect OTP');

        return res.render('forgotPass', {
            title: "Level Up | Forgot Password",
            email: undefined,
            verify: false,
            layout: "forgotPassLayout"
        });
    }
};

module.exports.change = async function (req, res) {
    if (req.session.email)
        return res.redirect('back');
    if (req.body.password !== req.body.confirmPassword)
        return res.redirect('back');

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    Users.findOneAndUpdate({ email: req.session.matchEmail }, { $set: {
        password: hashedPassword
    }}, {
        new: true
    }, function (err, user) {
        req.session.matchEmail = undefined;

        if (err)
        {
            console.log("Password cannot be changed");
            return res.redirect('back');
        }

        return res.redirect('/users/login');
    });
};
