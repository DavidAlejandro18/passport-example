const express = require('express');
const hbs = require('hbs');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const app = express();
const port = 8000;

// setup for body-parser module
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// express session middleware setup
app.use(session({
    secret: 'W$q4=25*8%v-}UV',
    resave: true,
    saveUninitialized: true
}));

// passport middleware setup ( it is mandatory to put it after session middleware setup)
app.use(passport.initialize());
app.use(passport.session());

// setup for loading static resources from 'public' directory
app.use(express.static(path.join(__dirname,'public')));

// view engine setup
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));
//app.set('views', path.join(__dirname,'views'));

require('./routes/index')(app, passport);

app.listen(port, () => console.log(`Server is running on port ${port}`));