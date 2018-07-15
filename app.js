var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3100;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var nodemailer = require('nodemailer');
var generator = require('generate-password');



var path = require('path'),
    fs = require('fs');
 var urls = require('http')
var server = urls.createServer(app)


// var configDB = require('./config/database.js');

mongoose.connect("mongodb://localhost:27017/4nono"); 

require('./config/passport')(passport); 



app.configure(function() {

	app.use(express.cookieParser());
	app.use(express.bodyParser()); 
	app.use(express.static(path.join(__dirname, 'public')));
	app.set('views', __dirname + '/views');
	app.engine('html', require('ejs').renderFile);
	app.use(express.session({ secret: 'knoldus' })); 
	app.use(express.bodyParser({uploadDir:'/images'}));
	app.use(passport.initialize());
	app.use(passport.session()); 
	app.use(flash()); 

});



require('./app/routes.js')(app, passport,server,nodemailer,generator); 

server.listen(port);
console.log('Listening  to  port ' + port);


