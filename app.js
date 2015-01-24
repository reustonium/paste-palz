// Modules
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');

var app = express();

// Models
var Blurb = mongoose.model('blurb', {
    url: String
});

// Express Config
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));

app.get('/api/v1/blurbs', function(req, res){
    res.json('hi');
});

app.listen(app.get('port'), function(){
   console.log('Up and running on port %d', app.get('port'));
});