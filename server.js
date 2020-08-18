var express  = require('express');
var app      = express();
var expressWs = require('express-ws')(app);
var port     = process.env.PORT || 8080;

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
const MongoStore = require('connect-mongo')(session);

var configDB = require('./config/database.js');


// configuration ===============================================================
mongoose.Promise = global.Promise;

const dbPromise = mongoose.connect(configDB.url, {
    useMongoClient: true
});

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
var year = Date.now() + 31556952000;
app.use(session({
    secret: 'ilovemyfamily', // session secret
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        dbPromise,
        collection: 'sessions'
    }),
    cookie: { maxAge: year }
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

// routes ======================================================================
require('./app/webSocket.js')(app,expressWs);
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/emoji.js')(app)
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

