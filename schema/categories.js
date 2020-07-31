const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
	catID: {
		type: String
	},
	catType: {
		type: String
	}
});

module.exports = User = mongoose.model('categorySchema', categorySchema);
