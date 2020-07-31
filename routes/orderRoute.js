var express = require('express');
var router = express.Router();
var Order = require('../schema/orders');
var mongoose = require('mongoose');
var Schema = mongoose.schema;
var uuidv4 = require('uuid');

router.post('/getOrders', function(req, res) {
	const request = req.body.data;
	const order = Order.find({ accID: request.accID }, function(err, docs) {
		res.json(docs);
	});
});

router.get('/getOrder/:id', function(req, res) {
	const id = req.params.id;
	const order = Order.find({ accID: id }, function(err, docs) {
		res.json(docs);
	});
});
router.get('/getAllOrders', function(req, res) {
	const request = req.body.data;
	const order = Order.find({}, function(err, docs) {
		res.json(docs);
	});
});

router.post('/addOrder', (req, res) => {
	const request = req.body.data;

	const order = new Order({
		orderID: uuidv4(),
		modeOfPayment: request.modeOfPayment,
		orderDate: request.orderDate,
		orderItems: request.orderItems,
		orderStatus: request.orderStatus,
		paymentStatus: request.paymentStatus,
		accID: request.accID
	});
	order
		.save()
		.then((result) => {
			setTimeout(() => {
				const order = Order.find({ accID: request.accID }, function(err, docs) {
					res.json(docs);
				});
			}, 1200);
		})
		.catch((err) => {
			console.log(err);
		});
});

function removeUndefinedProps(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop) && obj[prop] === '') {
			delete obj[prop];
		}
	}
	return obj;
}

router.put('/editOrder', (req, res) => {
	const request = req.body.data;
	query = { orderID: request.orderID };
	let status = '';
	if (request.status === 'Received') {
		status += 'Payed';
	} else {
		status += 'Pending';
	}
	Order.findByIdAndUpdate(
		{ _id: request.id },
		{ orderStatus: request.status, paymentStatus: status },
		{ useFindAndModify: false },
		(err, place) => {
			if (err) return res.send(err);

			setTimeout(() => {
				Order.find({ accID: request.account }, function(err, docs) {
					res.json(docs);
				});
			}, 1200);
		}
	);
});

router.put('/editOrder/:id', (req, res) => {
	const request = req.body.data;
	const id = req.params.id;

	Order.findByIdAndUpdate({ _id: id }, { useFindAndModify: false }, (err, place) => {
		if (err) return res.send(err);

		setTimeout(() => {
			Order.find({ accID: request.account }, function(err, docs) {
				res.json(docs);
			});
		}, 1200);
	});
});

router.post('/editToCart', function(req, res) {
	const request = req.body.data;

	let query = {
		accID: request.accID,
		_id: request._id
	};

	Cart.findOneAndRemove(query, request, function(err, place) {
		if (err) {
			return res.status(500).send({ error: 'unsuccessful' });
		}
		setTimeout(() => {
			const cart = Cart.find({ accID: request.accID }, function(err, docs) {
				res.json(docs);
			});
		}, 1200);
	});
});

module.exports = router;
