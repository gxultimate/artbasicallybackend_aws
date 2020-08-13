var express = require('express');
var router = express.Router();
var Transaction = require('../schema/transaction');
var Cart = require('../schema/cart');
var mongoose = require('mongoose');
var Schema = mongoose.schema;

router.get('/getTransactions', function(req, res) {
	const accounts = Transaction.find({}, function(err, docs) {
		res.json(docs);
	});
});
router.get('/getUserTransactions', function(req, res) {
	const request = req.body.data;
	const accounts = Transaction.find({}, function(err, docs) {
		res.json(docs);
	});
});

router.post('/addTransaction', (req, res) => {
	const request = req.body.data;
	const transaction = new Transaction({
		transactionID: request.transactionID,
		accID: request.accID,
		accFname: request.accFname,
		accLname: request.accLname,
		accSuffix: request.accSuffix,
		accAddress: request.accAddress,
		accEmailAddress: request.accEmailAddress,
		artistName: request.artistName,
		artistID: request.artistID,
		artworkName: request.artworkName,
		dateOfTransaction: request.dateOfTransaction,
		artworkSize: request.artworkSize,
		artworkPrice: request.artworkPrice,
		artworkPaymentAmount: request.artworkPaymentAmount,
		modeOfPayment: request.modeOfPayment,
		orderDate: request.orderDate,
		orderStatus: request.orderStatuss
	});
	transaction
		.save()
		.then((result) => {
			setTimeout(() => {
				const transactions = Transaction.find({}, function(err, docs) {
					res.json(docs);
				});
			}, 1200);
		})
		.catch((err) => {
			console.log(err);
		});
	// res.send('POST request to the homepage')
});

router.post('/addToCart', function(req, res) {
	const request = req.body.data;
	console.log(request, 'aws');
	let query = { artworkName: request.artworkName, artistName: request.artistName };
	let count = 0;
	const cartList = Cart.find({ query }, (err, docs) => {
		if (err || docs === null) {
			count += 0;
		} else {
			count += 0;
		}
	});

	if (count === 0) {
		const cart = new Cart({
			accID: request.accID,
			artistName: request.artistName,
			artworkName: request.artworkName,
			dateOfTransaction: request.dateOfTransaction,
			artworkSize: request.artworkSize,
			artworkPaymentAmount: request.artworkPaymentAmount,
			artworkImg: request.artworkImg,
			artworkMaterial: request.artworkMaterial,
			artworkFramingOptions: request.artworkFramingOptions,
			artworkQuantity: request.artworkQuantity,
			artworkPrice: request.artworkPrice
		});
		cart
			.save()
			.then((result) => {
				setTimeout(() => {
					const cart = Cart.find({ accID: request.accID }, function(err, docs) {
						res.json(docs);
					});
				}, 1200);
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		res.send(false);
	}
});

router.delete('/editToCart/:id', function(req, res, next) {
	Cart.remove({ _id: req.params.id }, function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

router.post('/getToCart', function(req, res) {
	const request = req.body.data;
	let query = { accID: request.accID };

	const cart = Cart.find({ accID: request.accID }, (err, docs) => {
		if (err || docs === null) {
			let doc = {
				accID: '',
				artistName: '',
				artworkName: '',
				dateOfTransaction: '',
				artworkSize: '',
				artworkPaymentAmount: '',
				artworkImg: '',
				artworkMaterial: '',
				artworkFramingOptions: '',
				artworkQuantity: ''
			};
			res.json(doc);
		} else {
			if (docs.length !== 0) {
				res.json(docs);
			} else {
				let doc = [
					{
						accID: '',
						artistName: '',
						artworkName: '',
						dateOfTransaction: '',
						artworkSize: '',
						artworkPaymentAmount: '',
						artworkImg: '',
						artworkMaterial: '',
						artworkFramingOptions: '',
						artworkQuantity: ''
					}
				];
				res.json(doc);
			}
		}
	});
});

module.exports = router;
