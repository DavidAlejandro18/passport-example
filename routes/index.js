const { Router } = require('express');
const { loggingIn, logout, renderLogin, renderDashboard } = require('../controllers/auth.controller');
const router = Router();
const { validarDashboard, validarLogin } = require('../middlewares');

router.get('/dashboard', [
    validarDashboard
], renderDashboard);

router.get('/', [
    validarLogin
], renderLogin);

router.get('/logout', logout);

router.post('/login', loggingIn);

module.exports = router;