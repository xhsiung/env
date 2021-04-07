'use strict';
var ini = require("ini")
var fs = require("fs")
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var config = process.cwd() + "/conf/config.ini"
var noconf = ini.parse( fs.readFileSync(config, "utf-8") );
var host = noconf.noapp.host
var port = parseInt( noconf.noapp.port )

//var publicPath = path.resolve(__dirname, './public');
var publicPath = process.cwd()+'/public';


// point for static assets
app.use(express.static(publicPath));

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());

module.exports = {
	myapp: app,	
	myhost: host,
	myport: port
}
