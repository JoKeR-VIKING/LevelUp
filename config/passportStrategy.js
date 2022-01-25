const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, function (req, email, password, done) {
    User.find({ email: email }, async function (err, user) {
        if (err)
        {
            console.log("Error finding users");
            return done(null, false);
        }
        if (user.length === 0)
        {
            req.flash('noUser', 'No such user exists');
            return done(null, false);
        }

        const result = await bcrypt.compare(password, user[0].password);
        if (!result)
        {
            req.flash('incorrectPass', 'Password Incorrect');
            return done(null, false);
        }

        req.session.name = user[0].name;
        return done(null, user);
    });
}));

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated())
        return next();

    return res.redirect('/users/signup');
};

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated())
        res.locals.user = req.user;

    return next();
};

passport.serializeUser(function (user, done) {
    return done(null, user[0].id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err || user.length === 0)
        {
            console.log("Error in deserialising user");
            return done(null, false);
        }

        return done(null, user);
    });
});