const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, function (email, password, done) {
    User.find({ email: email }, function (err, user) {
        if (err)
        {
            console.log("Error finding users");
            return done(null, false);
        }
        if (user.length === 0)
        {
            return done(null, false);
        }

        const result = bcrypt.compare(password, password);
        if (!result)
        {
            return done(null, false);
        }

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