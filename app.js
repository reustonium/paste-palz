// Modules
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

// Mongo Config
mongoose.connect('mongodb://' + process.env.IP + '/test');

// Express Config
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Passport Config
require('./config/passport')(passport);
app.use(session({secret: 'tempsecret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes Config
app.use('/api/v1', require('./app/routers/apiRouter'));
require('./app/routers/router')(app, passport);


app.listen(app.get('port'), function(){
   console.log('Up and running on port %d', app.get('port'));
});