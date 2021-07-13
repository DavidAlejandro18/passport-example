const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    (username, password, done) => {
        if(username === 'test@gmail.com' && password === '1234') {
            return done(null, {username: 'test@gmail.com'});
        } else {
            return done(null, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    done(null, {username: username});
}); 

const loggingIn = (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/',
        successRedirect: '/dashboard'
    })(req, res, next);
}

const logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

const renderLogin = (req, res) => {
    res.render('login', {
        title: "Login"
    });
}

const renderDashboard = (req, res) => {
    res.render('dashboard', {
        title: "Dashboard"
    });
}

module.exports = {
    loggingIn,
    logout,
    renderLogin,
    renderDashboard
}