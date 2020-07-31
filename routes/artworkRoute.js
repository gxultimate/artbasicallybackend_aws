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

	Artwork.findByIdAndUpdate({ _id: request._id }, request, { new: true, useFindAndModify: true }, function(
		err,
		place
	) {
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

router.get('/getArtworkInfo', async (req, res) => {
	let artworks = await Artwork.find({});
	res.json(artworks);
});

router.get('/getSingleArtworkInfo/:id', async (req, res) => {
	let id = req.params.id;
	let resp = await Artwork.findOne({ artworkID: id });
	res.json(resp);
});

router.get('/getArtistArtwork/:id', async (req, res) => {
	let id = req.params.id;

	let artistartwork = await Artwork.find({ artistName: id });
	res.json(artistartwork);
});

router.post('/getCustomerArtwork', async (req, res) => {
	let categories = req.body.data;

	await Artwork.find({}, (err, docs) => {
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
});

router.get('/getEmergingArtistArtwork', async (req, res) => {
	let docs = await (await Artwork.find({})).reverse();
	res.json(_.uniqBy(docs, (a) => a.artistName));
});

router.get('/getArtistFollowArtwork/:email', async (req, res) => {
	let email = req.params.email;
	let artworkList2 =  Artist.find({ accessType: 'Artist', accFollowers: { $in: [ email ] } });

	await Artwork.find({}, (err, docs) => {
		if (err) res.send(err);
		docs.filter((art) => {
			artworkList2.map((artist) => {
				if (`${artist.accFname} ${artist.accLname}` === art.artistName) {
					return art;
				}
			});
		});

		res.json(_.uniqBy(docs, (a) => a.artistName));
	});
});

router.get('/getRelatedWorkByCategory/:category', async (req, res) => {
	let category = JSON.parse(req.params.category);
	let filteredArt = [];
	await Artwork.find({ artTheme: { $in: category.artTheme }, artStyle: { $in: category.artStyle } }, (err, docs) => {
		res.json(docs);
	});
});

module.exports = router;
