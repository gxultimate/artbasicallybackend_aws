const { filter } = require('lodash');

let express = require('express'),
	mongoose = require('mongoose'),
	uuidv4 = require('uuid/v4'),
	router = express.Router(),
	fs = require('fs'),
	Photo = require('../schema/photo'),
	Artwork = require('../schema/artworks'),
	moment = require('moment'),
	path = require('path'),
	multer = require('multer'),
	cloudinary = require('cloudinary'),
	cloudinaryStorage = require('multer-storage-cloudinary'),
	Artist = require('../schema/account'),
	loki = require('lokijs'),
	db = new loki('db.json'),
	_ = require('lodash');
db.addCollection('artworks', { indices: [ 'artworkID' ] });

cloudinary.config({
	cloud_name: 'startupprojectph',
	api_key: '791841236177612',
	api_secret: 'J_CxEeWYjcFLQnY55N4pa9LW6lA'
});

const DIR = './public/';

router.post('/addArtwork', (req, res) => {
	const request = req.body.data;

	const artwork = new Artwork({
		artworkID: request.artworkID,
		artName: request.artName,
		artDescription: request.artDescription,
		artStyle: request.artStyle,
		artTheme: request.artTheme,
		artPrice: request.artPrice,
		artSize: request.artSize,
		artRating: request.artRating,
		accID: request.accID,
		artistName: request.artistName,
		artworkDateCreated: request.artworkDateCreated,
		artDimension: request.artDimension,
		artType: request.artType,
		artCategory: request.artCategory,
		dateAdded: moment().format('MM/DD/YYYY'),
		artworkImg: request.artworkImg,
		artworkStatus: 'Pending'
	});
	artwork
		.save()
		.then((result) => {
			setTimeout(() => {
				const artworks = Artwork.find({}, function(err, docs) {
					docs.map((art) => {
						db.getCollection('artworks').insert(art);
						db.saveDatabase(art);
					});
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

router.post('/editArtwork', function(req, res) {
	const request = removeUndefinedProps(req.body.data);

	Artwork.findByIdAndUpdate({ _id: request._id }, request, { new: true, useFindAndModify:true }, function(err, place) {
		if (err) {
			return res.status(500).send({ error: 'unsuccessful' });
		}
		setTimeout(() => {
			const artwork = Artwork.find({}, function(err, docs) {
				res.json(docs);
			});
		}, 1200);
	});
});

router.get('/getArtworkInfo', (req, res) => {
	let artworks = db.getCollection('artworks');

	if (artworks.find({}).length >= 3) {
		res.json(artworks.find({}));
	} else {
		Artwork.find({}, (err, docs) => {
			if (err) res.send(err);
			docs.map((art) => {
				db.getCollection('artworks').insert(art);
				db.saveDatabase(art);
			});
			res.json(docs);
		});
	}
});

router.get('/getSingleArtworkInfo/:id', (req, res) => {
	let id = req.params.id;

	let artworks = db.getCollection('artworks').find({ artworkID: id });
	if (artworks.length !== 0) {
		res.json(artworks);
	} else {
		Artwork.findOne({ artworkID: id }, (err, docs) => {
			if (err) res.send(err);
			db.getCollection('artworks').insert(docs);
			db.saveDatabase(docs);

			res.json(docs);
		});
	}
});

router.get('/getArtistArtwork/:id', (req, res) => {
	let id = req.params.id;
	let artworkList = [];

	if (db.getCollection('artworks').find({}).length !== 0) {
		let artistArtwork = db.getCollection('artworks').find({ artistName: id });
		res.json(artistArtwork);
	} else {
		Artwork.find({ artistName: id }, (err, docs) => {
			if (err) res.send(err);

			docs.map((art) => {
				if (art.artistName === id) {
					db.getCollection('artworks').insert(art);
					db.saveDatabase(art);
					return art;
				}
			});
			res.json(docs);
		});
	}
});

router.post('/getCustomerArtwork', (req, res) => {
	let categories = req.body.data;
	let artworkList = [];

	if (db.getCollection('artworks').find({}).length !== 0) {
		let artistArtwork = db.getCollection('artworks').find({}).filter((art) => {
			categories.map((cat) => {
				if (art.artCategory.includes(cat)) {
					return art;
				}
			});
		});

		res.json(artistArtwork);
	} else {
		Artwork.find({}, (err, docs) => {
			if (err) res.send(err);

			docs.map((art) => {
				categories.map((cat) => {
					if (art.artCategory.includes(cat)) {
						return art;
					}
				});
			});
			res.json(docs);
		});
	}
});

router.get('/getEmergingArtistArtwork', async (req, res) => {
	let artworkList = [];
	let artist = await Artist.find({ accessType: 'Artist' }, (err, docs) => {
		docs.map((doc) => {
			artworkList.push(`${doc.accFname} ${doc.accLname}`);
		});
	});

	if (db.getCollection('artworks').find({}).length !== 0) {
		let filteredArt = [];
		let artistArtwork = db.getCollection('artworks').find({}).filter((art) => {
			artworkList.reverse().map((artist) => {
				if (art.artistName === artist) {
					filteredArt.push(art);
				}
			});
		});
		let arr = _.uniqBy(filteredArt, (a) => a.artistName);

		res.json(arr);
	} else {
		Artwork.find({}, (err, docs) => {
			if (err) res.send(err);
			docs.map((art) => {
				artworkList.reverse().map((artist) => {
					if (art.artistName === artist) {
						return art;
					}
				});
			});
			let arr = _.uniqBy(docs, (a) => a.artistName);
			res.json(arr);
		});
	}
});

router.get('/getArtistFollowArtwork/:email', async (req, res) => {
	let email = req.params.email;
	let artworkList = [];
	let artist = await Artist.find({}, (err, docs) => {
		docs.map((doc) => {
			if (Object.values(doc.accFollowers).includes(email)) {
				artworkList.push(`${doc.accFname} ${doc.accLname}`);
			}
		});
	});

	if (db.getCollection('artworks').find({}).length !== 0) {
		let filteredArt = [];

		let artistArtwork = db.getCollection('artworks').find({}).filter((art) => {
			artworkList.reverse().map((artist) => {
				if (art.artistName === artist) {
					filteredArt.push(art);
				}
			});
		});
		let arr = _.uniqBy(filteredArt, (a) => a.artistName);

		res.json(arr);
	} else {
		Artwork.find({}, (err, docs) => {
			if (err) res.send(err);
			docs.map((art) => {
				artworkList.reverse().map((artist) => {
					if (art.artistName === artist) {
						return art;
					}
				});
			});
			let arr = _.uniqBy(docs, (a) => a.artistName);
			res.json(arr);
		});
	}
});

router.get('/getRelatedWorkByCategory/:category', (req, res) => {
	let category = JSON.parse(req.params.category);

	if (db.getCollection('artworks').find({}).length !== 0) {
		let filteredArt = [];

		let artistArtwork = db.getCollection('artworks').find({}).map((art) => {
			category.map((cat, index) => {
				if (art.artTheme.includes(cat) || art.artStyle.includes(cat)) {
					filteredArt.push(art);
				}
			});
		});
		console.log(filteredArt,"arts1")
		res.json(_.uniqBy(filteredArt, (a) => a.artName));
	} else {
		let filteredArt = [];
		Artwork.find({}, (err, docs) => {
			if (err) res.send(err);
			docs.map((art) => {
				category.map((cat, index) => {
					if (art.artTheme.includes(cat) || art.artStyle.includes(cat)) {
						filteredArt.push(art);
					}
				});
			});
		});
		console.log(filteredArt,"arts2")
		res.json(_.uniqBy(filteredArt, (a) => a.artName));
	}
});

module.exports = router;
