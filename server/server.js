'use strict';

var path = require('path');
var express = require('express');
var Parse = require('parse/node');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

const SERVER_PORT = process.env.PORT || 1337;
const SERVER_HOST = process.env.HOST || 'localhost';
const APP_ID = process.env.APP_ID || 'mdtp-test';
const MASTER_KEY = process.env.MASTER_KEY || '';
const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://10.51.111.9:27017/parse';
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const DASHBOARD_AUTH = process.env.DASHBOARD_AUTH;

Parse.initialize(APP_ID);
Parse.serverURL = `http://localhost:${SERVER_PORT}/parse`;
Parse.masterKey = MASTER_KEY;
Parse.Cloud.useMasterKey();

const server = express();

server.use(
	'/parse',
	new ParseServer({
		databaseURI: DATABASE_URI,
		cloud: path.resolve(__dirname, 'cloud.js'),
		appId: APP_ID,
		masterKey: MASTER_KEY,
		fileKey: 'tesfiek',
		serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/parse`,
	})
);

server.use('/', (req,res) => res.sendFile(path.join(__dirname,'/public/index.html')));

server.listen(SERVER_PORT, () => console.log(
  `Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${SERVER_PORT}`
));
