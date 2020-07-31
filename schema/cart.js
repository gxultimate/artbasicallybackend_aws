const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
	accID: {
		type: String
	},
	artistName: {
		type: String
	},
	artistID: {
		type: String
	},
	artistName: {
		type: String
	},
	artworkName: {
		type: String
	},
	dateOfTransaction: {
		type: String
	},
	artworkSize: {
		type: String
	},
	artworkPaymentAmount: {
		type: String
	},
	artworkImg: {
		type: String
	},
	artworkMaterial: {
		type: String
	},
	artworkFramingOptions: {
		type: String
	},
	artworkQuantity: {
		type: String
	},
	artworkPrice: {
		type: String
	}
});

module.exports = Transaction = mongoose.model('cartSchema', cartSchema);
