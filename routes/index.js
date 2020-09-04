var express = require('express');
var router = express.Router();

const accountsRoute = require('./accountsRoute'),
	artworkRoute = require('./artworkRoute'),
	categoryRoute = require('./categoryRoute'),
	orderRoute = require('./orderRoute'),
	transactionRoute = require('./transactionRoute'),
	express = require('express'),
	router = express.Router();
router.use('/', accountsRoute);
router.use('/', artworkRoute);
router.use('/', categoryRoute);
router.use('/', orderRoute);
router.use('/', transactionRoute);
module.exports = router;
