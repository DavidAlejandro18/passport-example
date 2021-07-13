const express = require('express');
const hbs = require('hbs');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const routes = require('../routes');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.secret_session = process.env.SECRET_SESSION;

        this.middlewares();

        this.handlebars();

        this.routes();
    }

    middlewares() {
        // setup for body-parser module
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());

        // express session middleware setup
        this.app.use(session({
            secret: this.secret_session,
            resave: true,
            saveUninitialized: true
        }));

        // passport middleware setup ( it is mandatory to put it after session middleware setup)
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        // setup for loading static resources from 'public' directory
        this.app.use(express.static('public'));
    }

    handlebars() {
        // view engine setup
        this.app.set('view engine', 'hbs');
        hbs.registerPartials(path.join(__dirname, '../','/views/partials'));
    }

    routes() {
        //require('../routes/index')(app, passport);
        this.app.use(routes);
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Server is running on port ${this.port}`));
    }
}

module.exports = Server;