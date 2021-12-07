var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/bsczone.webtracktechnology.com/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/bsczone.webtracktechnology.com/fullchain.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env, httpsport } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// listen to requests
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => logger.info(`server started on https port ${port} (${env})`));
// app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;
