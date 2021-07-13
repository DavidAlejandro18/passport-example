const validarLogin = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/dashboard');
    } else {
        return next();
    }
}

const validarDashboard = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/');
    }
}

module.exports = {
    validarLogin,
    validarDashboard
}