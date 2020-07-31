var express = require('express');
var router = express.Router();
var Accounts = require('../schema/account'),
	Artwork = require('../schema/artworks');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var moment = require('moment');
var Schema = mongoose.schema;
var lokijs = require('lokijs');
var db = new lokijs('Account');

var artists = db.addCollection('artists', { indices: [ 'accID' ] });
var accounts = db.addCollection('accounts', { indices: [ 'accID' ] });

let hashPassword = (password) => {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(password, salt, function(err, hash) {
			return hash;
		});
	});
};

router.get('/getAccounts', function(req, res) {
	const account = Accounts.find({}, function(err, docs) {
		res.json(docs);
	});
});

router.post('/addAccounts', async (req, res) => {
	const request = req.body.data;
	let data = [];
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(request.password, salt);

	const accounts = await Accounts.findOne({ accEmailAddress: request.accEmailAddress }, (err, docs) => {
		if (docs.length !== 0) {
			res.send(false);
		} else {
			const account = new Accounts({
				accFname: request.accFname,
				accLname: request.accLname,
				accAddress: request.accAddress,
				accEmailAddress: request.accEmailAddress,
				accSuffix: request.accSuffix,
				accContact: request.accContact,
				accReg: request.accReg,
				username: request.Username,
				accID: request.accID,
				accessType: request.accessType,
				accInstitution: request.accInstitution,
				accCategories: request.accCategories,
				acc_Documents: request.acc_Documents,
				accStyles: request.accStyles,
				accFollowers: request.accFollowers,
				accPoints: request.accPoints,
				accStatus: request.accStatus,
				password: hash,
				accBday: request.accBday,
				artistDescription: request.artistDescription,
				accImg: request.accImg,
				acc_Status: 'pending',
				dateAdded: moment().format('MM/DD/YYYY')
			});
			account
				.save()
				.then((result) => {
					setTimeout(() => {
						const account = Accounts.find({}, function(err, doc) {
							res.json(doc);
						});
					}, 1200);
				})
				.catch((err) => {
					console.log(err);
				});
		}
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
function removeEmptyProps(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop) && obj[prop].length === 0) {
			delete obj[prop];
		} else if (obj.hasOwnProperty(prop) && obj[prop] === '0') {
			delete obj[prop];
		}
	}
	return obj;
}

router.post('/editAccount', function(req, res) {
	const request = req.body.data;

	let filteredRequest = removeEmptyProps(removeUndefinedProps(request));

	Accounts.findByIdAndUpdate({ _id: filteredRequest._id }, filteredRequest, { useFindAndModify: false }, function(
		err,
		place
	) {
		if (err) {
			return res.status(500).send({ error: 'unsuccessful' });
		}
		setTimeout(() => {
			const accounts = Accounts.find({}, function(err, docs) {
				docs.map((doc) => {
					if (doc._id === filteredRequest._id) {
						console.log(doc, 'doc');
					}
				});

				res.json(docs);
			});
		}, 1200);
	});
});

function removeNull(item) {
	let items = item.filter((arr) => {
		if (item !== '' && item !== null) {
			return item;
		}
	});
	return items;
}

router.post('/followAccount/:id', async (req, res) => {
	let request = removeUndefinedProps(req.body.data);
	let id = req.params.id;
	let name = request.accEmailAddress;

	let followers = [];
	const accounts = await Accounts.findById({ _id: id }, { useFindAndModify: false });
	let account = accounts.accFollowers.map((acc) => {
		if (acc !== '' && acc !== null) {
			followers.push(acc);
		}
	});

	if (followers.length !== 0) {
		if (followers.includes(name)) {
			delete followers[followers.indexOf(name)];
		} else {
			followers.push(name);
		}
	} else {
		followers.push(name);
	}

	const acc = Accounts.findByIdAndUpdate({ _id: id }, { accFollowers: removeNull(followers) }, function(err, result) {
		if (err || result !== undefined) {
			setTimeout(() => {
				const singleAccount = Accounts.find({ _id: id }, (err, doc) => {
					res.json(doc);
				});
			}, 1000);
		} else {
			setTimeout(() => {
				const singleAccount = Accounts.find({ _id: id }, (err, doc) => {
					res.json(doc);
				});
			}, 1000);
		}
	});
});

router.post('/loginAccounts', async function(req, res) {
	let request = req.body.data;
	try {
		const user = await Accounts.findOne({ accEmailAddress: request.accEmailAddress });
		const isMatch = bcrypt.compareSync(request.password, user.password);

		if (user.password === request.password) {
			res.json(user);
		} else if (!isMatch) {
			res.send(false);
		} else {
			res.json(user);
		}
	} catch (e) {
		res.send(false);
	}
});

router.get('/getArtists', (req, res) => {
	const artist = Accounts.find({}, { useFindAndModify: false }, function(err, docs) {
		let accList = docs.filter((acc) => {
			if (acc.accessType === 'Artist') {
				artists.insert(acc);
				db.saveDatabase(acc);
				return acc;
			}
		});
		res.json(accList);
	});

	// }
});

router.get('/getSingleArtists/:id', (req, res) => {
	let id = req.params.id;
	let artwork = Artwork.find({ artworkID: id });

	if (artwork.length !== undefined) {
		res.json(artwork);
	} else {
		const accounts = Accounts.find({}, function(err, docs) {
			let accList = docs.filter((acc) => {
				if (`${acc.accFname} ${acc.accLname}` === id) {
					artists.insert(acc);
					db.saveDatabase(acc);
					return acc;
				}
			});
			res.json(accList);
		});
	}
});

module.exports = router;
