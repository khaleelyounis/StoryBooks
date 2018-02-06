const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const port = process.env.PORT || 3000;
const app = express();

//Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');

//Load Keys file
const keys = require('./config/keys');

//Load User Model
require('./models/Users');

//Passport Config
require('./config/passport')(passport);

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose connect
mongoose.connect(keys.mongoURI)
    .then(() => {
        console.log('mongoDB connected')
    })
    .catch(err => console.log(err));

//Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

//Use Routes
app.use('/auth', auth);
app.use('/', index);

app.listen(port, () => {
    console.log('You have entered the realm of development on port: ' + port);
});